import type { VerifyErrors } from 'jsonwebtoken';
import { verify, decode } from 'jsonwebtoken';
import { JWTError } from './error/jwt/jwt.error';
import type { TPayload } from './jwt.core.type';

class JWTDecode {
  private readonly secret: string;

  private readonly token: string;

  constructor(token: string, secret = '') {
    this.secret = secret;
    this.token = token;
  }

  public decode() {
    return new Promise<TPayload>((resolve) => {
      resolve(decode(this.token) as TPayload);
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }

  public verify() {
    return new Promise<TPayload>((resolve) => {
      resolve(
        verify(this.token, this.secret, {
          algorithms: ['HS256'],
        }) as TPayload,
      );
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTDecode };
