import { ValueTypeError } from '../error';
import { NoEnvValueError } from './error';

export function setupValidateEnv() {
  const {
    NODE_ENV,
    API_VERSION,
    COOKIE_SECRET,
    PORT,
    CORS_URL,
    // DB_HOST,
    // DB_PORT,
    // DB_DATABASE_NAME,
    // DB_USER,
    // DB_PASSWORD,
    CACHE_HOST,
    CACHE_PORT,
    CACHE_PASSWORD,
    DEV_TAG,
    // STATIC_PATH,
    // DEFAULT_SOCKS_URL,
  } = process.env as Partial<typeof process.env>;

  switch (true) {
    case NODE_ENV === undefined:
      throw new NoEnvValueError({ message: 'NODE_ENV' });
    case API_VERSION === undefined:
      throw new NoEnvValueError({ message: 'API_VERSION' });
    case API_VERSION !== undefined && !/^v\d+$/.test(`${API_VERSION}`):
      throw new ValueTypeError({
        message: 'API_VERSION',
        miscellaneous: {
          expectedValue: 'vNUMBER',
          actualValue: API_VERSION,
        },
      });
    case COOKIE_SECRET === undefined:
      throw new NoEnvValueError({ message: 'COOKIE_SECRET' });
    case PORT === undefined:
      throw new NoEnvValueError({ message: 'PORT' });
    case Number.isNaN(Number(PORT)):
      throw new ValueTypeError({
        message: 'PORT',
        miscellaneous: {
          expectedValue: 'number',
          actualValue: PORT,
        },
      });
    case CORS_URL === undefined:
      throw new NoEnvValueError({ message: 'CORS_URL' });
    // case STATIC_PATH === undefined:
    //   throw new NoEnvValueError({ message: 'STATIC_PATH' });
    // case DB_HOST === undefined:
    //   throw new NoEnvValueError({ message: 'DB_HOST' });
    // case DB_PORT === undefined:
    //   throw new NoEnvValueError({ message: 'DB_PORT' });
    // case Number.isNaN(Number(DB_PORT)):
    //   throw new ValueTypeError({
    //     message: 'DB_PORT',
    //     miscellaneous: {
    //       expectedValue: 'number',
    //       actualValue: DB_PORT,
    //     },
    //   });
    // case DB_DATABASE_NAME === undefined:
    //   throw new NoEnvValueError({ message: 'DB_DATABASE_NAME' });
    // case DB_USER === undefined:
    //   throw new NoEnvValueError({ message: 'DB_USER' });
    // case DB_PASSWORD === undefined:
    //   throw new NoEnvValueError({ message: 'DB_PASSWORD' });
    case CACHE_HOST === undefined:
      throw new NoEnvValueError({ message: 'CACHE_HOST' });
    case CACHE_PORT === undefined:
      throw new NoEnvValueError({ message: 'CACHE_PORT' });
    case Number.isNaN(Number(CACHE_PORT)):
      throw new ValueTypeError({
        message: 'CACHE_PORT',
        miscellaneous: {
          expectedValue: 'number',
          actualValue: CACHE_PORT,
        },
      });
    case CACHE_PASSWORD === undefined:
      throw new NoEnvValueError({ message: 'CACHE_PASSWORD' });
    case DEV_TAG === undefined:
      throw new NoEnvValueError({ message: 'DEV_TAG' });
    // case DEFAULT_SOCKS_URL === undefined: throw new NoEnvValueError('DEFAULT_SOCKS_URL');
    // case !/^socks:\/{2}(?:\d{1,3}.){3}\d{1,3}:\d{1,5}$/.test(DEFAULT_SOCKS_URL): throw new ValueTypeError('DEFAULT_SOCKS_URL', {
    //   expectedValue: 'socks://xxx.yyy.xxx.yyy:xxxxx',
    //   actualValue: DEFAULT_SOCKS_URL,
    // });
    // case JWT_SECRET === undefined: throw new NoEnvValueError('JWT_SECRET');
    // case JWT_EXP === undefined: throw new NoEnvValueError('JWT_EXP');
    // case Number.isNaN(Number(JWT_EXP)): throw new ValueTypeError('JWT_EXP', {
    //       expectedValue: 'number',
    //       actualValue: JWT_EXP,
    //     });
    default:
      void 0;
  }
}
