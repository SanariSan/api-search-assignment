import type { NextFunction, Response } from 'express';
import { SessionManager } from '../../../../helpers/session';
import type { TRequestValidatedEntity } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

/* eslint-disable @typescript-eslint/require-await */
export const searchEntityV2CTR = async (
  req: TRequestValidatedEntity,
  res: Response,
  next: NextFunction,
) => {
  // await SessionManager.destroy({ session: req.session });

  new SuccessResponse({
    res,
    data: {},
  }).send();
};
