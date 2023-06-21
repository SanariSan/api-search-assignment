import type { Response } from 'express';
import type { IError } from '../../../error';
import type { TRequestNarrowed } from '../../express.type';
import {
  ForbiddenErrorResponse,
  InternalErrorResponse,
  AuthenticationErrorResponse,
  NotFoundErrorResponse,
  RegistrationErrorResponse,
  BadRequestErrorResponse,
  AbortedErrorResponse,
} from '../../responses';
import {
  AbortedError,
  CredentialsMismatchError,
  DuplicateUserError,
  NoSessionError,
  NotFoundError,
  ParamsValidationError,
  UserNotExistsError,
} from '../server';

function getMatchingErrorResponse(e: Readonly<IError>) {
  switch (true) {
    case e instanceof DuplicateUserError: {
      return RegistrationErrorResponse;
    }
    case e instanceof UserNotExistsError:
    case e instanceof CredentialsMismatchError: {
      return AuthenticationErrorResponse;
    }
    case e instanceof NotFoundError: {
      return NotFoundErrorResponse;
    }
    case e instanceof NoSessionError: {
      return ForbiddenErrorResponse;
    }
    case e instanceof ParamsValidationError: {
      return BadRequestErrorResponse;
    }
    case e instanceof AbortedError: {
      return AbortedErrorResponse;
    }
    default: {
      return InternalErrorResponse;
    }
  }
}

const handleExpress = (e: Readonly<IError>, req: TRequestNarrowed, res: Response) => {
  const { miscellaneous = {} } = e;

  // new (getMatchingErrorResponse(e))({ res, miscellaneous }).send();
  const ErrorResponse = getMatchingErrorResponse(e);
  const errorResponse = new ErrorResponse({ res, miscellaneous });
  errorResponse.send();
};

export { handleExpress };
