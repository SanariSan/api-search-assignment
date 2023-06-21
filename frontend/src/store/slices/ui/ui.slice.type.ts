type TMessage = {
  title?: string;
  description?: string;
};

type TUiInitState = {
  successMessage: TMessage | undefined;
  infoMessage: TMessage | undefined;
  warningMessage: TMessage | undefined;
  errorMessage: TMessage | undefined;
  pathname: Location['pathname'];
  isSidebarOpened: boolean;
  colorModeAnimationDuration: number;
  colorModeChangeStatus: 'completed' | 'ongoing';
  isMobile: boolean;
  colorModeToogleCoords: { x: number; y: number };
  screenDetails: {
    w: number;
    h: number;
  };
};

export type { TMessage, TUiInitState };
