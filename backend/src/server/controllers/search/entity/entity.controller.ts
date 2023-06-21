import type { NextFunction, Response } from 'express';
import { SessionManager } from '../../../../helpers/session';
import type { TRequestValidatedEntity } from '../../../express.type';
import { SuccessResponse } from '../../../responses';
import { ENTITIES } from '../../../../logic';

export const searchEntityCTR = async (
  req: TRequestValidatedEntity,
  res: Response,
  next: NextFunction,
) => {
  const { email: emailQ, number: numberQ } = req.query;

  const filtered = ENTITIES.filter(({ email, number }, idx) => {
    if (email !== emailQ) return;
    if (numberQ !== undefined && number !== numberQ) return;
    return true;
  });

  console.log(req.session, req.session.id);

  req.session.user = {
    isProcessing: true,
  };
  await SessionManager.save({ session: req.session });

  new SuccessResponse({
    res,
    data: {
      entities: filtered,
    },
  }).send();
};
