import { Router } from 'express';
import { sessionInitCTR } from '../../../../../controllers/access';
import { syncHandleMW } from '../../../../../middleware';

const sessionInitR = Router();

sessionInitR.get('/session-init', syncHandleMW(sessionInitCTR));

export { sessionInitR };
