import connectRedis from 'connect-redis';
import cors from 'cors';
import type { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';
import { CacheDBConnectionManager } from '../../db';
import { ELOG_LEVEL } from '../../general.type';
import { publishLog } from '../../modules/access-layer/events/pubsub';

function setupSettingsExpress(app: Express) {
  const { DEV_TAG, NODE_ENV, COOKIE_SECRET } = process.env;

  const RedisStore = connectRedis(session);
  const redisClient = CacheDBConnectionManager.getInstance().getConnection();

  // origin: true for mirroring Front 'Origin' header back
  // origin: CORS_URL for static env url
  app.set('env', NODE_ENV);
  // app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.set('trust proxy', 2);
  app.use(
    cors({
      origin: true,
      credentials: true,
      optionsSuccessStatus: 204,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          connectSrc: ['*'],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "'unsafe-inline'", 'data:', 'blob:'],
        },
      },
      // allow requests from any origin (e.g. dev front on localhost -> back on host)
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: false }));
  app.set('x-powered-by', false);

  const devSession = session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: COOKIE_SECRET,
    name: 'dev_api_sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'lax',
    },
  });

  const prodSession = session({
    store: new RedisStore({
      client: redisClient,
    }),
    secret: COOKIE_SECRET,
    name: 'api_sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      sameSite: 'lax',
    },
  });

  // conditional session handler based on header with secret
  app.use((req: Request, res: Response, next: NextFunction) => {
    const devTag = req.header('x-dev-tag');
    if (devTag !== undefined && devTag === DEV_TAG) devSession(req, res, next);
    else prodSession(req, res, next);
  });

  // track ip
  app.use((req: Request, res: Response, next: NextFunction) => {
    // const xRealIp = req.headers['cf-connecting-ip'] ?? req.headers['x-real-ip'];
    // const xForwardedFor = req.headers['x-forwarded-for'];
    // let ip: string;

    // if (xRealIp !== undefined) {
    //   ip = `${xRealIp.toString()}`;
    // } else if (xForwardedFor !== undefined) {
    //   [ip] = `${xForwardedFor.toString()}`.split(',');
    // } else {
    //   ip = `${req.socket.remoteAddress ?? ''}`;
    // }

    // req.ip seems to be fine with the right trust proxy setup
    publishLog(ELOG_LEVEL.INFO, {
      ip: req.ip,
      url: req.url,
    });
    next();
  });

  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100, // Limit each IP to 100 requests per 1 min
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(apiLimiter);

  // log headers, debug only
  // app.use((req, res, next) => {
  //   publishLog(ELOG_LEVEL.DEBUG, req.headers);
  //   next();
  // });
}

export { setupSettingsExpress };
