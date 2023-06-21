import { GenericExpressError } from './generic.error';

class AbortedError extends GenericExpressError {
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

    this.name = 'AbortedError';
    this.description = `Request was aborted due to resubmission`;
    this.miscellaneous = miscellaneous;
  }
}

export { AbortedError };
