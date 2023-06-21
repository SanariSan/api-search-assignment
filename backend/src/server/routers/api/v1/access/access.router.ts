import { Router } from 'express';
import { sessionInitR } from './session-init';

const accessR = Router();

accessR.use(sessionInitR);

export { accessR };
