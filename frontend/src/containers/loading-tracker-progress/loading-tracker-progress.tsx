import { Box, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COLORS } from '../../chakra-setup';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';
import { useLoadingTracker } from '../../hooks/use-loading-tracker';

const LoadingTrackerProgressContainer: FC = () => {
  const coeff = 20;
  const calculateExpPercentageCb = useCallback(
    () => (_x: number, _coeff: number) => (_x / (_x + _coeff)) * 100,
    [],
  );
  const calculateExpPercentage = useMemo(calculateExpPercentageCb, [calculateExpPercentageCb]);

  const { isLoading } = useLoadingTracker();
  const isLoadingRef = useRef(isLoading);
  const { isMounted } = useDelayedUnmount({ isVisible: isLoading, delay: 700 });
  const [percent, setPercent] = useState(() => calculateExpPercentage(0, coeff));
  const timerRef = useRef<NodeJS.Timer>();
  const [loadingBg] = [useColorModeValue(COLORS.whatsapp.accentLight, COLORS.whatsapp.accentDark)];

  // first set live loading state to be able to access in setTimeout cb
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // if loading is ongoing - increase progress percent
  // if loading is done - set percent to 100 and exit timer
  const increaseX = useCallback(() => {
    if (!isLoadingRef.current) {
      timerRef.current = undefined;
      setPercent(100);
      return;
    }

    const ms = Math.random() * (250 - 100) + 100;
    setPercent((s) => calculateExpPercentage(s + 1, coeff));
    setTimeout(increaseX, ms);
  }, [isLoadingRef, coeff, calculateExpPercentage]);

  // if loading is ongoing - and we don't have a timer yet - start one
  useEffect(() => {
    if (isLoading && timerRef.current === undefined) increaseX();
  }, [isLoading, increaseX]);

  // when loading is done and progress bar (not full component) "unmounted" - reset percent to 0
  useEffect(() => {
    if (!isMounted) setPercent(0);
  }, [isMounted]);

  // cleanup
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <>
      {isMounted && (
        <Box
          bg={loadingBg}
          opacity={isLoading ? 1 : 0}
          boxShadow={'0px -2px 5px 0px rgba(0,0,0,0.75)'}
          position={'fixed'}
          top={0}
          left={0}
          h={'5px'}
          transition={'opacity 0.7s linear, max-width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)'}
          zIndex={1000}
          w={`100%`}
          maxW={`${percent}%`}
        />
      )}
    </>
  );
};

export { LoadingTrackerProgressContainer };
