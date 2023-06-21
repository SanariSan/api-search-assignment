import { ResponseError } from '../response.error';

class BadStatusError extends ResponseError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'BadStatusError';
    this.description = `Bad response status`;
  }
}

export { BadStatusError };
