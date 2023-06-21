import { Router } from 'express';

const v2 = Router();

v2.get('/example', (req, res, next) => {
  res.send('OK');
});

export { v2 };
