import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class ForbiddenErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.FORBIDDEN,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.ACCESS_FAILURE;
    this.title = 'Access error';
    this.detail = 'Insufficient privileges to access resource';
  }
}

export { ForbiddenErrorResponse };
