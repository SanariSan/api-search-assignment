import { readFileSync } from 'fs';
import path from 'path';

type TCategories = 'laptops' | 'phones' | 'accessories';
type TModifiers =
  | 'gaming'
  | 'work'
  | 'chill'
  | 'hi-tech'
  | 'goofy'
  | 'boomer'
  | 'charger'
  | 'headphones';

type TCatalogue = Array<{
  id: string;
  name: string;
  price: number;
  category: TCategories[keyof TCategories];
  modifier: TModifiers[keyof TModifiers][keyof TModifiers[keyof TModifiers]];
  lsrc: string;
  hsrc: string;
}>;

const CATALOGUE = JSON.parse(
  readFileSync(path.join(process.cwd(), './catalogue.json'), 'utf8'),
) as TCatalogue;

export { CATALOGUE };
export type { TCategories, TModifiers, TCatalogue };
