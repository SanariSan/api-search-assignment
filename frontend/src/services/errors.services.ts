/* eslint-disable max-classes-per-file */
import { GenericError } from '../modules/core/error';

class InternalError extends GenericError {
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
    super(message);

    this.name = 'InternalError';
    this.description = 'Generic Internal Error';
    this.miscellaneous = miscellaneous;
  }
}

class AbortError extends GenericError {
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
    super(message);

    this.name = 'AbortError';
    this.description = 'Request was manually aborted';
    this.miscellaneous = miscellaneous;
  }
}
export { AbortError, InternalError };
