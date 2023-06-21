import { randomInt } from 'crypto';

function rndIntInRange(min = 0, max: number = min + 1) {
  return randomInt(min, max);
}

export { rndIntInRange };
