import { Router } from 'express';
import { searchEntityCTR, searchEntityV2CTR } from '../../../../../controllers';
import {
  asyncHandleMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../../middleware';
import { SCHEME_SEARCH } from '../../../../../schemes';

const entityR = Router();

entityR.get(
  '/entity',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEME_SEARCH.entity, EVALIDATION_TARGET.QUERY)),
  asyncHandleMW(searchEntityCTR),
);

entityR.get(
  '/entity_v2',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEME_SEARCH.entity, EVALIDATION_TARGET.QUERY)),
  asyncHandleMW(searchEntityV2CTR),
);

export { entityR };
