import { GenericExpressError } from './generic.error';

class UserNotExistsError extends GenericExpressError {
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

    this.name = 'UserNotExistsError';
    this.description = `Requested user was not found to perform authorization`;
    this.miscellaneous = miscellaneous;
  }
}

export { UserNotExistsError };
