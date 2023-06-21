import { readFileSync } from 'fs';
import path from 'path';
import type { TEntity } from '../server/express.type';

const ENTITIES = JSON.parse(
  readFileSync(path.join(process.cwd(), './entities.json'), 'utf8'),
) as Array<Required<TEntity>>;

export { ENTITIES };
