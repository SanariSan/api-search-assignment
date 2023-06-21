import type { NextFunction, Response } from 'express';
import { SessionManager } from '../../../../helpers/session';
import type { TRequestNarrowedAuthenticated } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const accessLogoutCTR = async (
  req: TRequestNarrowedAuthenticated,
  res: Response,
  next: NextFunction,
) => {
  await SessionManager.destroy({ session: req.session });

  new SuccessResponse({
    res,
    data: {},
  }).send();
};
