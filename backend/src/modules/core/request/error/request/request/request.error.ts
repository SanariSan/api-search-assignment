import { RequestGenericError } from '../request-generic.error';

class RequestError extends RequestGenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'RequestError';
    this.description = `Request error, failed before or during sending`;
  }
}

export { RequestError };
