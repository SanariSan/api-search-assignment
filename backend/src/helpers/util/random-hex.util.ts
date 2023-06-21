import { randomBytes } from 'node:crypto';

function randomHex(length = 16): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(length, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex').slice(0, length));
    });
  });
}

function randomHexSync(length = 16) {
  return randomBytes(length).toString('hex').slice(0, length);
}

export { randomHex, randomHexSync };
