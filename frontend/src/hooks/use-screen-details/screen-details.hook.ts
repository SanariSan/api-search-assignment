import { useCallback, useState } from 'react';
import { getScreenDetails } from '../../helpers/browser';
import { useWindowEvent } from '../use-window-event';

const useScreenDetails = () => {
  const [details, setDetails] = useState<ReturnType<typeof getScreenDetails>>(() =>
    getScreenDetails(),
  );

  const callback = useCallback(() => {
    setDetails(getScreenDetails());
  }, []);

  useWindowEvent('resize', callback);

  return details;
};

export { useScreenDetails };
