import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../../general.type';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type { TRequestNarrowed } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const sessionInitCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  publishLog(ELOG_LEVEL.WARN, {
    ts: new Date(),
    ip: req.ip,
    sessionId: req.session.id,
    sessionData: req.session.user,
    action: `Initialized session`,
  });
  return new SuccessResponse({
    res,
    data: {},
  }).send();
};
