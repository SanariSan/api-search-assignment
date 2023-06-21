import type { Response } from 'express';
import { GenericApiResponse } from './generic.response';

class GenericSuccessResponse extends GenericApiResponse {
  protected data: Record<string, unknown>;

  constructor({
    res,
    status,
    data,
  }: {
    res: Response;
    status: number;
    data?: Record<string, unknown>;
  }) {
    super({ res, status });

    this.data = data ?? {};
  }

  protected compose() {
    this.body = {
      data: this.data,
    };

    return this;
  }
}

export { GenericSuccessResponse };
