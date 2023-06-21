import { useCallback, useRef } from 'react';

// pass useCallback wrapped fn
const useThrottle = <TArgs extends unknown[]>({
  cb,
  delay = 500,
}: {
  cb: (...args: TArgs) => void;
  delay: number;
}) => {
  const timer = useRef<NodeJS.Timeout>();

  const throttledCb = useCallback(
    (...args: TArgs) => {
      if (timer.current !== undefined) return;

      cb(...args);
      timer.current = setTimeout(() => {
        timer.current = undefined;
      }, delay);
    },
    [cb, delay],
  );

  const reset = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return [throttledCb, reset];
};

export { useThrottle };
