import { GenericError } from '../../../../../error';

class SchemesError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'SchemesError';
    this.description = `Schemes generic error`;
    this.miscellaneous = miscellaneous;
  }
}

export { SchemesError };
