import { SubCore } from '../../../core/pubsub';
import type { IPublishEntity } from './pubsub.type';

class Sub {
  private readonly sub: SubCore;

  constructor() {
    this.sub = new SubCore();
  }

  public subscribe(channel: string) {
    this.sub.subscribe(channel);
  }

  public unsubscribe(channel: string) {
    this.sub.unsubscribe(channel);
  }

  public listen(cb: ({ channel, logLevel, message }: IPublishEntity) => void) {
    this.sub.on('message', cb);
  }

  public listenerCount() {
    return this.sub.listenerCount('message');
  }

  public removeListener(cb: ({ channel, logLevel, message }: IPublishEntity) => void) {
    this.sub.removeListener('message', cb);
  }
}

export { Sub };
