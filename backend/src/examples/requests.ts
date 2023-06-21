import type { AxiosError } from 'axios';
import { stringify } from 'querystring';
import { publishError } from '../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../general.type';
import { Request } from '../modules/access-layer/request';
import { BadStatusError } from '../modules/core/request/error';
import { makeForm, parseResponse } from '../helpers/request';
import type { IError } from '../error';

async function sendJson() {
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: { foo: 1, bar: 2, baz: 3 },
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully + move error to local services dir from core
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

async function sendQs() {
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: stringify({ foo: 1, bar: 2, baz: 3 }),
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully + move error to local services dir from core
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

async function sendMultipart() {
  const form = makeForm({ obj: { foo: 1, bar: 2, baz: 3 } });
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: form,
    headers: {
      ...form.getHeaders(),
    },
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully + move error to local services dir from core
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

// ----------------------------------------------------------------

async function exampleRequests() {
  const respJson = await sendJson().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as IError);
  });
  const { request: jsonRequest, response: jsonResponse } = respJson || {};

  const respQs = await sendQs().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as IError);
  });
  const { response: qsResponse } = respQs || {};

  const respMultipart = await sendMultipart().catch((error) => {
    publishError(ELOG_LEVEL.WARN, error as IError);
  });
  const { response: multipartResponse } = respMultipart || {};

  console.dir(
    {
      data: jsonResponse?.data,
      headersReq: jsonRequest?.headers,
      headersResp: jsonResponse?.headers,
    },
    { depth: 10, colors: true },
  );
  console.dir({ data: qsResponse?.data }, { depth: 10, colors: true });
  console.dir({ data: multipartResponse?.data }, { depth: 10, colors: true });
}

export { exampleRequests };
