import { EventEmitter } from 'events';
import { PubSubStorage } from '../storage';

class SubCore extends EventEmitter {
  constructor() {
    super();
    PubSubStorage.setChannels(this, new Set());
  }

  // add channel to instance-channels map
  public subscribe(channel: string): void | never {
    PubSubStorage.getChannels(this).add(channel);
  }

  // remove channel from instance-channels map
  public unsubscribe(channel: string): void | never {
    PubSubStorage.getChannels(this).delete(channel);
  }
}

export { SubCore };
