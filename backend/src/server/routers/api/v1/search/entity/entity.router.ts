import { Router } from 'express';
import { accessLoginCTR } from '../../../../../controllers';
import {
  asyncHandleMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../../middleware';
import { SCHEME_SEARCH } from '../../../../../schemes';

const entityR = Router();

entityR.post(
  '/entity',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEME_SEARCH.login, EVALIDATION_TARGET.BODY)),
  asyncHandleMW(accessLoginCTR),
);

export { entityR };
