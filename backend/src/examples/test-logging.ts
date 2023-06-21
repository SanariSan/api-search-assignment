import { publishError, publishLog } from '../modules/access-layer/events/pubsub';
import { NoDataError } from '../modules/core/request/error';
import { ELOG_LEVEL } from '../general.type';
import { duplicateNTimes, randomHexSync, rndIntInRange, sleep } from '../helpers/util';

function exampleLogging() {
  async function test() {
    await sleep(2000);
    void test();
    publishLog(
      ELOG_LEVEL.INFO,
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
    );
  }
  void test();

  async function pubLogs() {
    await sleep(1000);
    void pubLogs();
    publishLog(ELOG_LEVEL.INFO, `${duplicateNTimes(randomHexSync(), rndIntInRange(1, 3))}`);
  }
  void pubLogs();

  async function generateError() {
    await sleep(5000);
    void generateError();
    publishError(ELOG_LEVEL.WARN, new NoDataError('Some expected error'));
    throw new Error('Some unexpected error thrown by itself');
  }
  void generateError();
}

export { exampleLogging };
