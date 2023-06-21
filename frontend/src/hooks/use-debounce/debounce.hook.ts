import { useCallback, useRef } from 'react';

// pass useCallback wrapped fn
const useDebounce = <TArgs extends unknown[]>({
  cb,
  delay = 500,
}: {
  cb: (...args: TArgs) => void;
  delay: number;
}) => {
  const timer = useRef<NodeJS.Timeout>();

  const debouncedCb = useCallback(
    (...args: TArgs) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );

  const reset = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return [debouncedCb, reset];
};

// pass useCallback wrapped fn
const useDebounceLeading = <TArgs extends unknown[]>({
  cb,
  delay = 500,
}: {
  cb: (...args: TArgs) => void;
  delay: number;
}) => {
  const timer = useRef<NodeJS.Timeout>();

  const debouncedCb = useCallback(
    (...args: TArgs) => {
      if (timer.current === undefined) {
        cb(...args);
      }

      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        timer.current = undefined;
      }, delay);
    },
    [cb, delay],
  );

  const reset = useCallback(() => {
    clearTimeout(timer.current);
  }, []);

  return [debouncedCb, reset];
};

export { useDebounce, useDebounceLeading };
