import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { useScreenDetails } from '../../../hooks/use-screen-details';
import { setScreenDetailsUi } from '../../../store';
import { useIsMobile } from '../../../hooks/use-is-mobile';

type TScreenDetailsTrackerContainer = {
  [key: string]: unknown;
};

const ScreenDetailsTrackerContainer: FC<TScreenDetailsTrackerContainer> = () => {
  const d = useAppDispatch();
  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();

  useIsMobile();

  useEffect(() => {
    void d(setScreenDetailsUi({ w, h }));
  }, [w, h, d]);

  return null;
};

const ScreenDetailsTrackerContainerMemo = memo(ScreenDetailsTrackerContainer);

export { ScreenDetailsTrackerContainerMemo };
