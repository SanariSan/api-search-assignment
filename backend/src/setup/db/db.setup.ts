import { CacheDBConnectionManager, PersistentDBConnectionManager } from '../../db';
import { ELOG_LEVEL } from '../../general.type';
import { sleep } from '../../helpers/util';
import { publishError, publishLog } from '../../modules/access-layer/events/pubsub';
import { DbConnectionError } from '../error';

// client.get(this.testKey, function(err,res) {
//   if(err)
//     throw err;

//   if(res === expectedValue)
//     return startApp();
// });

export async function setupCacheDb() {
  publishLog(ELOG_LEVEL.WARN, `Cache DB connection attempt`);

  const connection = CacheDBConnectionManager.getInstance().getConnection();

  if ((await connection.v4.sendCommand(['ping']).catch(() => {})) === 'PONG') {
    publishLog(ELOG_LEVEL.WARN, `Cache DB connection success`);
    return;
  }
}

export async function setupPersistentDb() {
  const retriesMax = 10;
  for (let i = 0; i < retriesMax; i += 1) {
    publishLog(ELOG_LEVEL.WARN, `Persistent DB connection attempt ${String(i + 1)}`);

    try {
      await (await PersistentDBConnectionManager.getInstance().getConnection().connect()).done();
      publishLog(ELOG_LEVEL.WARN, `Persistent DB connection success`);
      return;
    } catch (error) {
      publishError(ELOG_LEVEL.WARN, error as Error);
    }

    await sleep(5000);
  }

  throw new DbConnectionError({ message: `Could not connect to pg after ${retriesMax} attempts` });
}
