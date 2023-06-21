import type { Express } from 'express';
import { NotFoundError } from '../../server/error';
import type { TApiBranches } from '../../server/routers';
import * as apiBranches from '../../server/routers';

function setupRoutersExpress(app: Express) {
  const { API_VERSION } = process.env;

  // console.dir(apiBranches, { depth: 10 }); // => { v1: [Getter], v2: [Getter] }
  app.use(`/api/${API_VERSION}`, (apiBranches as unknown as TApiBranches)[API_VERSION]);

  // general fallback when no static content is served
  app.use(`*`, () => {
    throw new NotFoundError({ message: 'Route not found' });
  });

  // moved to nginx | serve static content
  // if (NODE_ENV === 'production') {
  //   app.use(express.static(path.resolve(STATIC_PATH)));
  //   app.get('*', (req, res) => {
  //     console.log('static');
  //     res.sendFile(path.resolve(STATIC_PATH, 'index.html'));
  //   });
  // }
}

export { setupRoutersExpress };
