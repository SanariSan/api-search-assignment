import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { setPathnameUi } from '../../../store';

type TLocationTrackerContainer = {
  [key: string]: unknown;
};

const LocationTrackerContainer: FC<TLocationTrackerContainer> = () => {
  const d = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    void d(setPathnameUi(pathname));
  }, [d, pathname]);

  return null;
};

const LocationTrackerContainerMemo = memo(LocationTrackerContainer);

export { LocationTrackerContainerMemo };
