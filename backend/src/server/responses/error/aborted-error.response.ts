import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class AbortedErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.CONFLICT,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.ABORTED_FAILURE;
    this.title = 'Aborted error';
    this.detail = 'Request was aborted due to resubmission';
  }
}

export { AbortedErrorResponse };
