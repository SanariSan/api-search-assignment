import { GenericExpressError } from './generic.error';

class NoSessionError extends GenericExpressError {
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

    this.name = 'NoSessionError';
    this.description = `Storage has no session for provided cookies or no cookies provided`;
    this.miscellaneous = miscellaneous;
  }
}

export { NoSessionError };
