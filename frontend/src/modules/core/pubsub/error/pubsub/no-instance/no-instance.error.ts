import { PubSubError } from '../pubsub.error';

class NoInstanceError extends PubSubError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'NoInstanceError';
    this.description = `Attempt to get channels from emitter, that is not prepared for that`;
    this.miscellaneous = miscellaneous;
  }
}

export { NoInstanceError };
