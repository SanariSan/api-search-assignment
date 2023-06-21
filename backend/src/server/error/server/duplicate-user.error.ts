import { GenericExpressError } from './generic.error';

class DuplicateUserError extends GenericExpressError {
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

    this.name = 'DuplicateUserError';
    this.description = `Attempt to create existing user`;
    this.miscellaneous = miscellaneous;
  }
}

export { DuplicateUserError };
