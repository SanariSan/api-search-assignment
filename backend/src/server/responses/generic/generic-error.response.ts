import type { Response } from 'express';
import { ERESPONSE_TYPE } from '../response.const';
import { GenericApiResponse } from './generic.response';

class GenericErrorResponse extends GenericApiResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  protected miscellaneous: Record<string, unknown>;

  constructor({
    res,
    status,
    miscellaneous,
  }: {
    res: Response;
    status: number;
    miscellaneous?: Record<string, unknown>;
  }) {
    super({ res, status });

    this.type = ERESPONSE_TYPE.FAILURE;
    this.title = 'Generic error';
    this.detail = 'No case-specific description provided';
    this.miscellaneous = miscellaneous ?? {};

    // if (process.env.NODE_ENV === 'development') {
    this.miscellaneous.stack = new Error('Traceback').stack;
    // }
  }

  // reimplement
  protected compose() {
    this.body = {
      type: this.type,
      title: this.title,
      detail: this.detail,
      miscellaneous: this.miscellaneous,
    };

    return this;
  }
}

export { GenericErrorResponse };
