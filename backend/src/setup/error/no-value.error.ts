import { GenericError } from '../../error';

class NoEnvValueError extends GenericError {
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

    this.name = 'NoEnvValueError';
    this.description = '.env value related error';
    this.miscellaneous = Object.assign(process.env, miscellaneous);
  }
}

export { NoEnvValueError };
