import type { TApiVersion } from './server/routers';

// no undefined options because running validate .env values fn on app launch
/* eslint-disable @typescript-eslint/naming-convention */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // general
      NODE_ENV: 'production' | 'development';
      API_VERSION: TApiVersion;
      COOKIE_SECRET: string;
      PORT: string;
      // db
      // DB_HOST: string;
      // DB_PORT: string;
      // DB_DATABASE_NAME: string;
      // DB_USER: string;
      // DB_PASSWORD: string;
      // cache
      CACHE_HOST: string;
      CACHE_PORT: string;
      CACHE_PASSWORD: string;
      // production
      CORS_URL: string;
      STATIC_PATH: string;
      // development
      // ...
      // JWT_SECRET: string;
      // JWT_EXP: string;
      // DEFAULT_SOCKS_URL: string;
    }
  }
}
/* eslint-enable @typescript-eslint/naming-convention */

export {};
