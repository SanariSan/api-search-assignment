import type { TPayload } from './jwt.core.type';

class JWTPayloadBuilder {
  private readonly payload: TPayload;

  constructor() {
    this.payload = {};
  }

  public setIssuer(issuer: string): this {
    this.payload.iss = issuer;
    return this;
  }

  public setAud(audience: string): this {
    this.payload.aud = audience;
    return this;
  }

  public setSub(subject: string): this {
    this.payload.sub = subject;
    return this;
  }

  public setIat(issuedAt: number): this {
    this.payload.iat = issuedAt;
    return this;
  }

  public setExp(expiresAt: number): this {
    this.payload.exp = expiresAt;
    return this;
  }

  public setPrm(params: string): this {
    this.payload.prm = params;
    return this;
  }

  public getPayload(): TPayload {
    return this.payload;
  }
}

export { JWTPayloadBuilder };
