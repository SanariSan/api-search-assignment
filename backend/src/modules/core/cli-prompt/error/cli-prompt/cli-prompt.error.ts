import { GenericError } from '../../../../../error';

class CliPromptError extends GenericError {
  public name: string;

  public description: string;

  public miscellaneous?: Record<string, unknown>;

  constructor(message: string, miscellaneous?: Record<string, unknown>) {
    super(message);

    this.name = 'CliPromptError';
    this.description = 'Cli prompt module error';
    this.miscellaneous = miscellaneous;
  }
}

export { CliPromptError };
