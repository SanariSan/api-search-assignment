import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class InternalErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.INTERNAL_ERROR,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.FAILURE;
    this.title = 'Internal error';
    this.detail = 'Internal server error, please try again later';
  }
}

export { InternalErrorResponse };
