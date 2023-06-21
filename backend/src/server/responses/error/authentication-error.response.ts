import type { Response } from 'express';
import { GenericErrorResponse } from '../generic';
import { ERESPONSE_STATUS, ERESPONSE_TYPE } from '../response.const';

class AuthenticationErrorResponse extends GenericErrorResponse {
  protected type: number;

  protected title: string;

  protected detail: string;

  constructor({ res, miscellaneous }: { res: Response; miscellaneous?: Record<string, unknown> }) {
    super({
      res,
      status: ERESPONSE_STATUS.UNAUTHORIZED,
      miscellaneous,
    });

    this.type = ERESPONSE_TYPE.AUTH_FAILURE;
    this.title = 'Authentication error';
    this.detail = 'Authentication failed, invalid credentials';
  }
}

export { AuthenticationErrorResponse };
