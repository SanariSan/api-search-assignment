type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
  idInstance: string;
  apiTokenInstance: string;
  wid: string;
};

export type { TIsAuthenticated, TUserAuthInitState };
