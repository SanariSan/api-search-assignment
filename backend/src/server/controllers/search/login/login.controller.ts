import type { NextFunction, Response } from 'express';
import { SessionManager } from '../../../../helpers/session';
import type { TRequestValidatedLogin } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const accessLoginCTR = async (
  req: TRequestValidatedLogin,
  res: Response,
  next: NextFunction,
) => {
  // const { username, password } = req.body;

  // let possibleUser: Awaited<ReturnType<typeof UserRepository.findByUsername>>;
  // try {
  //   possibleUser = await UserRepository.findByUsername({ username });
  // } catch {
  //   throw new UserNotExistsError({
  //     message: 'User does not exist',
  //     miscellaneous: {
  //       isAuthenticated: false,
  //     },
  //   });
  // }

  // if (!(await compare(password, possibleUser.passwordhash))) {
  //   throw new CredentialsMismatchError({
  //     message: 'Wrong password',
  //     miscellaneous: {
  //       isAuthenticated: false,
  //     },
  //   });
  // }

  await SessionManager.regenerate({ session: req.session });
  req.session.user = {
    isProcessing: true,
  };
  await SessionManager.save({ session: req.session });

  new SuccessResponse({
    res,
    data: {},
  }).send();
};
