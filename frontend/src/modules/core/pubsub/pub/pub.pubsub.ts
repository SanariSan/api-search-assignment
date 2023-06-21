import type { IPublishEntityCore } from './pub.pubsub.type';
import { PubSubStorage } from '../storage';

class PubCore {
  // send message from all instances who has channel in their sets
  public static publish(optionsObject: IPublishEntityCore): void {
    [...PubSubStorage.getInstancesToChannelsMap().entries()].forEach(([emitter, channels]) => {
      if (channels.has(optionsObject.channel)) {
        emitter.emit('message', optionsObject);
      }
    });
  }
}

export { PubCore };
