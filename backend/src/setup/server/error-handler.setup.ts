import type { Express, NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../general.type';
import { publishError, publishErrorUnexpected } from '../../modules/access-layer/events/pubsub';
import {
  GenericExpressError,
  handleExpress,
  InternalError,
  NotFoundError,
} from '../../server/error';
import type { TRequestNarrowed } from '../../server/express.type';

function setupErrorHandleExpress(app: Express) {
  app.use((err: Error, req: TRequestNarrowed, res: Response, next: NextFunction) => {
    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    if (err instanceof GenericExpressError) {
      publishError(ELOG_LEVEL.WARN, err);
      handleExpress(err, req, res);
      return;
    }

    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      publishError(ELOG_LEVEL.WARN, err);
      handleExpress(
        new NotFoundError({
          message: 'Resource not found',
          miscellaneous: {
            // err,
          },
        }),
        req,
        res,
      );
      return;
    }

    publishErrorUnexpected(ELOG_LEVEL.ERROR, err);
    handleExpress(
      new InternalError({
        message: 'Internal error',
        miscellaneous: {
          message: err.message,
        },
      }),
      req,
      res,
    );
  });
}

export { setupErrorHandleExpress };
