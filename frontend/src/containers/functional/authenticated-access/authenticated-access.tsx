import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { COLORS } from '../../../chakra-setup';
import { ELOG_LEVEL } from '../../../general.type';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import {
  loadingUserAuthSelector,
  obtainSessionAsync,
  userIsAuthenticatedSelector,
} from '../../../store';
import type { TAuthRoute } from './authenticated-access.type';

const AuthenticatedAccessContainer: FC<TAuthRoute> = ({ children, mustBe, redirectLocation }) => {
  const d = useAppDispatch();
  const isAuthenticated = useAppSelector(userIsAuthenticatedSelector);
  const isAuthenticatedMapped = useMemo(
    () =>
      isAuthenticated === true
        ? 'authenticated'
        : isAuthenticated === false
        ? 'unauthenticated'
        : 'any',
    [isAuthenticated],
  );
  const userAuthLoadingStatus = useAppSelector(loadingUserAuthSelector);
  const [spinner] = [useColorModeValue(COLORS.yellow[400], COLORS.yellow[400])];

  useEffect(() => {
    publishLog(ELOG_LEVEL.DEBUG, {
      isAuthenticated,
      mustBe,
      redirectLocation,
    });
  }, [isAuthenticated, mustBe, redirectLocation]);

  useEffect(() => {
    if (isAuthenticated === 'idle') void d(obtainSessionAsync());
  }, [d, isAuthenticated]);

  if (isAuthenticated === 'idle') {
    return (
      <Box
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          visibility: userAuthLoadingStatus === 'loading' ? 'visible' : 'hidden',
          zIndex: 1,
        }}
      >
        <Spinner size={'xl'} color={spinner} thickness={'3px'} />
      </Box>
    );
  }

  return (
    <>
      {mustBe === 'any' || mustBe === isAuthenticatedMapped ? (
        children
      ) : (
        <Redirect to={redirectLocation ?? ''} />
      )}
    </>
  );
};

export { AuthenticatedAccessContainer };
