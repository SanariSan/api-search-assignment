import { GenericExpressError } from './generic.error';

class ParamsValidationError extends GenericExpressError {
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

    this.name = 'ParamsValidationError';
    this.description = `Parameters validation error, missing or invalid fields`;
    this.miscellaneous = miscellaneous;
  }
}

export { ParamsValidationError };
