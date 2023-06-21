import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../../general.type';
import { SessionManager } from '../../../../helpers/session';
import { ENTITIES } from '../../../../logic';
import type { IPublishEntity } from '../../../../modules/access-layer/events/pubsub';
import { Sub, publishCustom } from '../../../../modules/access-layer/events/pubsub';
import type { TRequestValidatedEntity } from '../../../express.type';
import { AbortedErrorResponse, SuccessResponse } from '../../../responses';

const sub = new Sub();

export const searchEntityCTR = async (
  req: TRequestValidatedEntity,
  res: Response,
  next: NextFunction,
) => {
  // if user have active processing - clean that by calling event and launch new one
  if (req.session.user?.isProcessing === true) {
    publishCustom('cleanup', ELOG_LEVEL.WARN, 'cleanup');
  }

  req.session.user = {
    isProcessing: true,
  };

  await SessionManager.save({ session: req.session });

  // simple search
  const { email: emailQ, number: numberQ } = req.query;
  const filtered = ENTITIES.filter(({ email, number }) => {
    if (email !== emailQ) return;
    if (numberQ !== undefined && number !== numberQ) return;
    return true;
  });

  let timeoutId: NodeJS.Timeout;

  // this will be fired on cleanup event and return an error for previous call
  const cleanupCb = ({ channel }: IPublishEntity) => {
    if (channel === 'cleanup') {
      // clear success response timeout
      clearTimeout(timeoutId);

      // unsubscribe callback placed in current closure
      sub.removeListener(cleanupCb);

      // error response for previous call
      new AbortedErrorResponse({
        res,
      }).send();
    }
  };

  // this will be fired after successful 5s delay without new incoming requests
  const sendSuccessResponseCb = () => {
    // remove cleanup callback from current closure so it won't be triggered by later reqs
    sub.removeListener(cleanupCb);

    // mark processing as done
    req.session.user = {
      isProcessing: false,
    };

    // update flag in session and return success response from closure
    void SessionManager.save({ session: req.session }).then(() => {
      new SuccessResponse({
        res,
        data: {
          entities: filtered,
        },
      }).send();
      return;
    });
  };

  timeoutId = setTimeout(sendSuccessResponseCb, 5000);
  sub.listen(cleanupCb);
  sub.subscribe('cleanup');
};
