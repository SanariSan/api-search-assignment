import { createSelector } from 'reselect';
import type { TRootState } from '../../redux.store.type';

const uiPathnameSelector = (state: TRootState) => state.ui.pathname;
const uiSidebarStateSelector = (state: TRootState) => state.ui.isSidebarOpened;
const uiSuccessSelector = (state: TRootState) => state.ui.successMessage;
const uiWarningSelector = (state: TRootState) => state.ui.warningMessage;
const uiInfoSelector = (state: TRootState) => state.ui.infoMessage;
const uiErrorSelector = (state: TRootState) => state.ui.errorMessage;
const uiColorModeChangeStatusSelector = (state: TRootState) => state.ui.colorModeChangeStatus;
const uiColorModeAnimationDurationSelector = (state: TRootState) =>
  state.ui.colorModeAnimationDuration;
const uiIsMobileSelector = (state: TRootState) => state.ui.isMobile;
const uiColorModeToogleCoordsSelector = (state: TRootState) => state.ui.colorModeToogleCoords;
const uiScreenDetailsSelector = createSelector(
  (state: TRootState) => state.ui.screenDetails,
  (screenDetails) => screenDetails,
);

export {
  uiColorModeAnimationDurationSelector,
  uiColorModeToogleCoordsSelector,
  uiScreenDetailsSelector,
  uiColorModeChangeStatusSelector,
  uiErrorSelector,
  uiInfoSelector,
  uiIsMobileSelector,
  uiPathnameSelector,
  uiSidebarStateSelector,
  uiSuccessSelector,
  uiWarningSelector,
};
