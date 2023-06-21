import { Router } from 'express';
import { searchR } from './search';
import { accessR } from './access';

const v1 = Router();

v1.use('/access', accessR);
v1.use('/search', searchR);

export { v1 };
