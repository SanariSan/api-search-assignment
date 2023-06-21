import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class NotFoundErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.NOT_FOUND,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.FAILURE;
    this.title = 'Not found';
    this.detail = 'Requested resource was not found on the server';
  }
}

export { NotFoundErrorResponse };
