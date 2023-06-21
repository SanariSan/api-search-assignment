import fetch from 'cross-fetch';
import { sleep } from '../helpers/util';
import { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS } from './request.services.const';
import type { IRequestOptions } from './request.services.type';

const triggerLocalAbortControllerCbWrapper = (localAbortController: AbortController) => () => {
  localAbortController.abort();
};

const setupExternalAbortSignalListener = ({
  triggerLocalAbortControllerCb,
  abortSignal,
}: {
  triggerLocalAbortControllerCb: () => void;
  abortSignal: AbortSignal;
}) => {
  abortSignal.addEventListener('abort', triggerLocalAbortControllerCb);

  // if abort happened while was not listening - dispatch missed event
  if (abortSignal.aborted) {
    abortSignal.dispatchEvent(new Event('abort'));
  }
};

const cleanupExternalAbortSignalListener = ({
  triggerLocalAbortControllerCb,
  abortSignal,
}: {
  triggerLocalAbortControllerCb: () => void;
  abortSignal: AbortSignal;
}) => {
  abortSignal.removeEventListener('abort', triggerLocalAbortControllerCb);
};

/**
 * Logic is following:
 *
 * 1) Need to listen to outside abort signal
 * 2) Need to be able to abort req on timeout with local signal (local abort controller)
 * * * * * * * * * * * * * * * * *
 * So, the solution is the following:
 *
 * 1) Passing signal entity from outside (if exists and needed), otherwise dummy signal created in place
 *
 * 2) On each req try creating local AbortController, wrapping >IT< in outside abort signal listener,
 * passing >IT< to fetch
 *
 * 3) If outside signal aborts, local AbortController replicates state (aborts) through listener,
 * aborts ongoing req, then exits loop on check below | "if (abortSignal.aborted)"
 * >>This check is necessary to exit early and prevent redundant "sleep" operation,
 * since abort would be replicated on next event subscribe anyways
 *
 * 4) Since local AbortController is recreated on each iteration, we can abort it freely if timeout happens,
 * then on next iteration start from scratch and subscribe to outside signal again
 */

async function request({
  url,
  method,
  headers,
  body,
  fetchOtions,
  timeoutMS = 10_000,
  attemptDelayMS = 500,
  attemptDelayGrowthMS = 500,
  maxAttempts = 1,
  // for manually interrupting from outside
  abortSignal = new AbortController().signal,
}: IRequestOptions) {
  const requestInternal = (localAbortController: AbortController) => {
    const options = {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOtions,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
        ...headers,
      },
      signal: localAbortController.signal,
      method,
      body,
    };

    return fetch(url, options);
  };

  let errorReturn: Error | undefined;
  let currentAttempt = 0;
  while (currentAttempt < maxAttempts) {
    const localAbortController = new AbortController();
    const triggerLocalAbortControllerCb =
      triggerLocalAbortControllerCbWrapper(localAbortController);

    setupExternalAbortSignalListener({
      triggerLocalAbortControllerCb,
      abortSignal,
    });

    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      triggerLocalAbortControllerCb();
    }, timeoutMS);

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    let response: Response | undefined;
    try {
      response = await requestInternal(localAbortController);
    } catch (error) {
      // only system errors like no network, cors, etc
      errorReturn = error as Error;
    }

    clearTimeout(timeoutId);

    cleanupExternalAbortSignalListener({
      triggerLocalAbortControllerCb,
      abortSignal,
    });

    // exit point with response
    if (response !== undefined) {
      // console.dir({ url: response.url, status: response.status, headers: response.headers });
      return response;
    }

    // check if external signal was called at this point to not sleep when just need to exit
    if (abortSignal.aborted) {
      errorReturn = new Error('Request externally aborted');
      break;
    }

    await sleep(attemptDelayMS + currentAttempt * attemptDelayGrowthMS);

    currentAttempt += 1;
  }

  throw errorReturn as Error;
}

export { request };
