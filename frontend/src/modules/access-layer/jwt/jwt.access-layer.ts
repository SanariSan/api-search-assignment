import type { TPayloadBaseChecked } from '../../core/jwt';
import { JWTDecode, JWTEncode, JWTError, JWTPayloadBuilder } from '../../core/jwt';

const jwtSecretDefault = 'default';

// TODO: change TObjectUnknown to typed object, when token prm format is stable
function jwtEncode(
  customPayload: Record<string, unknown>,
  secret: string = process.env.JWT_SECRET ?? jwtSecretDefault,
) {
  const now = Date.now();
  const payload = new JWTPayloadBuilder()
    .setIat(now)
    .setExp(now + 1000 * 60 * 60 * 24 * Number(process.env.JWT_EXP ?? 1))
    .setPrm(JSON.stringify(customPayload))
    .getPayload();

  return new JWTEncode(payload, secret).sign();
}

async function jwtRead(token: string) {
  const payload = await new JWTDecode(token).decode();

  return payload;
}

async function jwtDecode(
  token: string,
  secret: string = process.env.JWT_SECRET ?? jwtSecretDefault,
) {
  const payload = await new JWTDecode(token, secret).verify();

  // check fields of verified token, count these three as base ones
  if (payload.iat === undefined || payload.exp === undefined || payload.prm === undefined) {
    throw new JWTError('Malformed token, fields missing', payload);
  }

  return payload as TPayloadBaseChecked;
}

export { jwtDecode, jwtEncode, jwtRead };
