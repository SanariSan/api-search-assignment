import { Router } from 'express';
import { searchR } from './search/search.router';

const v1 = Router();

v1.use('/search', searchR);

export { v1 };
