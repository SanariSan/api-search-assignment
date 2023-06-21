import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../../general.type';
import { SessionManager } from '../../../../helpers/session';
import { ENTITIES } from '../../../../logic';
import type { IPublishEntity } from '../../../../modules/access-layer/events/pubsub';
import { Sub, publishCustom } from '../../../../modules/access-layer/events/pubsub';
import type { TEntity, TRequestValidatedEntity } from '../../../express.type';
import { AbortedErrorResponse, SuccessResponse } from '../../../responses';

const sub = new Sub();

// this will be fired on cleanup event and prevent success response from being sent
const clearTimeoutCbWrap = ({ timeoutId }: { timeoutId: NodeJS.Timeout }) =>
  function clearTimeoutCb({ channel }: IPublishEntity) {
    if (channel === 'cleanup') {
      // cleanup itself after fired
      sub.removeListener(clearTimeoutCb);

      // clear timeout to avoid sending success response after abort happened
      clearTimeout(timeoutId);
    }
  };

// this will be fired on cleanup event and return an error for previous call
const abortPrevReqCbWrap = ({ res }: { res: Response }) =>
  function abortPrevReqCb({ channel }: IPublishEntity) {
    if (channel === 'cleanup') {
      // cleanup itself after fired
      sub.removeListener(abortPrevReqCb);

      // error response for previous call
      new AbortedErrorResponse({
        res,
      }).send();
    }
  };

// this will be fired after successful 5s delay without new incoming requests
const sendSuccessResponseCbWrap =
  ({
    req,
    res,
    payload,
  }: {
    req: TRequestValidatedEntity;
    res: Response;
    payload: Array<Required<TEntity>>;
  }) =>
  () => {
    // remove cleanup callbacks so they won't be triggered by later reqs as a side effect
    sub.removeAllListeners();

    // mark processing as done
    req.session.user = {
      isProcessing: false,
    };

    // update flag in session and return success response from closure
    void SessionManager.save({ session: req.session }).then(() => {
      new SuccessResponse({
        res,
        data: {
          entities: payload,
        },
      }).send();
      return;
    });
  };

export const searchEntityCTR = async (
  req: TRequestValidatedEntity,
  res: Response,
  next: NextFunction,
) => {
  // if user have active processing - clean that by calling event and launch new one
  if (req.session.user?.isProcessing === true) {
    publishCustom('cleanup', ELOG_LEVEL.WARN, 'cleanup');
  }

  req.session.user = {
    isProcessing: true,
  };

  await SessionManager.save({ session: req.session });

  // simple search
  const { email: emailQ, number: numberQ } = req.query;
  const filtered = ENTITIES.filter(({ email, number }) => {
    if (email !== emailQ) return;
    if (numberQ !== undefined && number !== numberQ) return;
    return true;
  });

  const sendSuccessResponseCb = sendSuccessResponseCbWrap({ req, res, payload: filtered });

  // schedule (success response)
  const timeoutId: NodeJS.Timeout = setTimeout(sendSuccessResponseCb, 5000);

  // schedule (error response) + (planned success response cancellation)
  const clearTimeoutCb = clearTimeoutCbWrap({ timeoutId });
  const abortPrevReqCb = abortPrevReqCbWrap({ res });

  sub.listen(abortPrevReqCb);
  sub.listen(clearTimeoutCb);

  sub.subscribe('cleanup');
};
