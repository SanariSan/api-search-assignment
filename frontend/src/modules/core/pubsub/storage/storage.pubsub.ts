import type { EventEmitter } from 'events';
import { NoInstanceError } from '../error/pubsub';

class PubSubStorage {
  // { Emitter instance: Set of channels names client subscribed to }
  private static readonly instancesToChannelsMap = new Map<EventEmitter, Set<string>>();

  public static getInstancesToChannelsMap() {
    return this.instancesToChannelsMap;
  }

  public static getChannels(emitterInstance: EventEmitter): Set<string> | never {
    const set: Set<string> | undefined = this.instancesToChannelsMap.get(emitterInstance);

    // could not happen normally, because .setChannels() happens in SubCore constructor, so can't pass non existing emitterInstance
    if (set === undefined) throw new NoInstanceError('Could not find emitter instance in list');

    return set;
  }

  public static setChannels(emitterInstance: EventEmitter, channels: Set<string>) {
    this.instancesToChannelsMap.set(emitterInstance, channels);
  }
}

export { PubSubStorage };
