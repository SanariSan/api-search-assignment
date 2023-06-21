import { ResponseError } from '../response.error';

class NoDataError extends ResponseError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'NoDataError';
    this.description = `No/Empty body in response, expected to have data`;
  }
}

export { NoDataError };
