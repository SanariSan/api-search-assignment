import type { IPublishEntity } from '../modules/access-layer/events/pubsub';
import { publishCustom, Sub } from '../modules/access-layer/events/pubsub';
import { ELOG_LEVEL } from '../general.type';

function testCb({ channel, logLevel, message }: IPublishEntity) {
  console.log(`Message-app.ts channel: ${channel} | message: ${String(message)}`);
}

function examplePubsub() {
  const sub = new Sub();

  sub.listen(testCb);
  sub.subscribe('test-channel');

  console.log(`Listeners for current sub instance: ${sub.listenerCount()}`);

  publishCustom('test-channel', ELOG_LEVEL.INFO, 'message here-1');
  publishCustom('test-channel', ELOG_LEVEL.INFO, 'message here-2');

  // unsubscribe from channel
  sub.unsubscribe('test-channel');

  publishCustom('test-channel', ELOG_LEVEL.INFO, 'message not here-3');

  // maybe remove listener at all
  sub.removeListener(testCb);

  console.log(`Listeners for current sub instance: ${sub.listenerCount()}`);
}

export { examplePubsub };
