import { Box, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { COLORS } from './chakra-setup';
import { DashboardLayoutContainer } from './containers/dashboard';
import {
  AuthenticatedAccessContainer,
  ErrorBoundaryGenericContainerMemo,
  LocationTrackerContainerMemo,
  ScreenDetailsTrackerContainerMemo,
} from './containers/functional';
import { LoadingTrackerProgressContainer } from './containers/loading-tracker-progress';
import { NotFoundContainerMemo } from './containers/not-found';
import { ThemeSwitchContainerMemo } from './containers/theme-switch';
import { ToastsContainerMemo } from './containers/toast/toast';

const App: FC = () => {
  const screenshotTargetRef = useRef(null);
  const [bg] = [useColorModeValue(COLORS.whatsapp.bgLight, COLORS.whatsapp.bgDark)];

  return (
    <ErrorBoundaryGenericContainerMemo>
      <ThemeSwitchContainerMemo screenshotTargetRef={screenshotTargetRef} />
      <LoadingTrackerProgressContainer />
      <LocationTrackerContainerMemo />
      <ScreenDetailsTrackerContainerMemo />
      <ToastsContainerMemo />

      <Box
        ref={screenshotTargetRef}
        display={'flex'}
        w={'100%'}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        bg={bg}
      >
        <Switch>
          <Route exact path={'/'}>
            <AuthenticatedAccessContainer mustBe={'authenticated'} redirectLocation={'/'}>
              <DashboardLayoutContainer />
            </AuthenticatedAccessContainer>
          </Route>
          <Route path="/">
            <NotFoundContainerMemo />
          </Route>
        </Switch>
        {/* <DebugContainer /> */}
      </Box>
    </ErrorBoundaryGenericContainerMemo>
  );
};
export { App };
