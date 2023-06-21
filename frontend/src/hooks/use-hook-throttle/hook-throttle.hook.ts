import { useEffect, useRef } from 'react';

export const useHookThrottle = <TArgs, TReturn>({
  useHook,
  args,
}: {
  useHook: (...args: TArgs[]) => TReturn;
  args: TArgs[];
}) => {
  const throttler = useRef<NodeJS.Timer | undefined>();
  const hookReturn = useHook(...args);
  const throttledReturn = useRef<TReturn>();

  useEffect(() => {
    if (throttler.current === undefined) {
      throttledReturn.current = hookReturn;
      throttler.current = setTimeout(() => {
        throttler.current = undefined;
      }, 33_500);
    }
  }, [hookReturn]);

  return throttledReturn;
};
