import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class BadRequestErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.BAD_REQUEST,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.VALIDATION_FAILURE;
    this.title = 'Invalid data';
    this.detail = 'Some fields are missing or contain malformed information';
  }
}

export { BadRequestErrorResponse };
