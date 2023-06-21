import { GenericError } from '../../../error';

class PubSubError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'PubSubError';
    this.description = 'PubSub related error';
    this.miscellaneous = miscellaneous;
  }
}

export { PubSubError };
