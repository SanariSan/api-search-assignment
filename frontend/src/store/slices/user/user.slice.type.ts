type TIsAuthenticated = 'idle' | boolean;

type TUserAuthInitState = {
  isAuthenticated: TIsAuthenticated;
};

export type { TIsAuthenticated, TUserAuthInitState };
