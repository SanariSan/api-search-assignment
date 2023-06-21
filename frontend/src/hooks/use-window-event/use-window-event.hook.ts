import { useEffect } from 'react';

// https://www.codedaily.io/tutorials/Creating-a-Reusable-Window-Event-Listener-Hook-with-useEffect-and-useCallback

// IMPORTANT NOTE: Callback passed here should be wrapped in useCallback
// or else it will cause constant Add / Remove of listener on every rerender
const useWindowEvent = (
  // maybe React.BaseSyntheticEvent / React.ChangeEvent<HTMLInputElement>
  event: keyof WindowEventMap,
  callback: (ev: Event) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    window.addEventListener(event, callback, options);
    // console.log(`Added listener | ${event}`);

    return () => {
      window.removeEventListener(event, callback);
      // console.log(`Removed listener | ${event}`);
    };
  }, [event, callback, options]);
};

export { useWindowEvent };
