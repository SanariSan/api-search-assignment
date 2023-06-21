import type { TUserAuthInitState } from './user.slice.type';

const USER_AUTH_INIT_STATE: TUserAuthInitState = {
  isAuthenticated: 'idle',
  idInstance: '',
  apiTokenInstance: '',
  wid: '',
};

export { USER_AUTH_INIT_STATE };
