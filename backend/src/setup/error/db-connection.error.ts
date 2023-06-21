import { GenericError } from '../../error';

class DbConnectionError extends GenericError {
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
    super(message);

    this.name = 'DbConnectionError';
    this.description = 'DB connection error';
    this.miscellaneous = miscellaneous;
  }
}

export { DbConnectionError };
