import { useCallback, useEffect } from 'react';
import { setIsMobileUi } from '../../store';
import { useAppDispatch } from '../redux';
import { useScreenDetails } from '../use-screen-details';
import { useDebounce } from '../use-debounce';

const useIsMobile = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  const setTypeCb = useCallback(
    ({ isMobile }: { isMobile: boolean }) => {
      d(setIsMobileUi({ isMobile }));
    },
    [d],
  );

  const [setTypeDebounced] = useDebounce({ cb: setTypeCb, delay: 500 });

  useEffect(() => {
    if ((w <= 400 && h <= 850) || (w <= 850 && h <= 400)) {
      setTypeDebounced({ isMobile: true });
      return;
    }

    setTypeDebounced({ isMobile: false });
  }, [w, h, setTypeDebounced]);
};

export { useIsMobile };
