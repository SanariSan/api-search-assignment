import { GenericError } from '../../../error';

class JWTError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'JWTError';
    this.description = `JWT generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { JWTError };
