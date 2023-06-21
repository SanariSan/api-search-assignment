import { GenericExpressError } from './generic.error';

class CredentialsMismatchError extends GenericExpressError {
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

    this.name = 'CredentialsMismatchError';
    this.description = `Provided credentials do not match expected values`;
    this.miscellaneous = miscellaneous;
  }
}

export { CredentialsMismatchError };
