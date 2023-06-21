import type { NextFunction, Response } from 'express';
import type { ObjectSchema } from 'joi';
import { isError } from 'joi';
import { validateBySchemaAsync } from '../../../modules/access-layer/schemes';
import { InternalError, ParamsValidationError } from '../../error';
import type { TRequest } from '../../express.type';
import { EVALIDATION_TARGET } from './schemes.type';

export function validateBySchemaAsyncMW(
  schema: ObjectSchema,
  target: EVALIDATION_TARGET = EVALIDATION_TARGET.BODY,
) {
  return async function validateBySchemaAsyncCTR(req: TRequest, res: Response, next: NextFunction) {
    try {
      await validateBySchemaAsync(schema, req[target]);
      next();
    } catch (error: unknown) {
      if (!isError(error)) {
        next(new InternalError({ message: 'Validation module internal error' }));
        return;
      }

      const invalidParams = error.details.map((el) => ({
        name: el.context?.key ?? el.context?.label ?? el.path[0],
        reason: el.message.replace(/"/g, ''),
      }));

      // console.dir(error, { depth: 10 });
      next(
        new ParamsValidationError({
          message: 'Invalid request fields',
          miscellaneous: {
            invalidParams,
          },
        }),
      );
    }
  };
}
