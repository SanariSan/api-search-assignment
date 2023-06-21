import { GenericError } from '../../../../../error';

class RequestGenericError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'RequestGenericError';
    this.description = `Request generic error`;
  }
}

export { RequestGenericError };
