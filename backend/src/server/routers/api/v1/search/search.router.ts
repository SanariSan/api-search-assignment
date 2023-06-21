import { Router } from 'express';
import { entityR } from './entity';

const searchR = Router();

searchR.use(entityR);

export { searchR };
