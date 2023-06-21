import type { VerifyErrors } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { JWTError } from './error/jwt/jwt.error';
import type { TPayload } from './jwt.core.type';

class JWTEncode {
  private readonly payload: TPayload;

  private readonly secret: string;

  constructor(payload: TPayload, secret: string) {
    this.secret = secret;
    this.payload = payload;
  }

  public sign() {
    return new Promise<string>((resolve) => {
      resolve(
        sign({ ...this.payload }, this.secret, {
          algorithm: 'HS256',
        }),
      );
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTEncode };
