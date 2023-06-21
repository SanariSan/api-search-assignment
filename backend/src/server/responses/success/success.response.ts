import type { Response } from 'express';
import { GenericSuccessResponse } from '../generic';
import { ERESPONSE_STATUS } from '../response.const';

class SuccessResponse extends GenericSuccessResponse {
  constructor({ res, data = {} }: { res: Response; data?: Record<string, unknown> }) {
    super({ res, status: ERESPONSE_STATUS.SUCCESS, data });
  }
}

export { SuccessResponse };
