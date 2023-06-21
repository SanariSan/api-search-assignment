import { GenericExpressError } from './generic.error';

class InternalError extends GenericExpressError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor({
    message,
    miscellaneous,
  }: {
    message: string;
    miscellaneous?: Record<string, unknown>;
  }) {
    super({ message });

    this.name = 'InternalError';
    this.description = `Internal server error, probably edge case hit`;
    this.miscellaneous = miscellaneous;
  }
}

export { InternalError };
