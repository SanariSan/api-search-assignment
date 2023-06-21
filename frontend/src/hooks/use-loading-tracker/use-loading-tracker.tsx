import { useEffect, useState } from 'react';
import {
  loadingSearchEntitiesSelector,
  loadingUserAuthSelector,
  uiPathnameSelector,
} from '../../store';
import { useAppSelector } from '../redux';

const useLoadingTracker = () => {
  const searchEntitiesLoadingStatus = useAppSelector(loadingSearchEntitiesSelector);
  const userAuthLoadingStatus = useAppSelector(loadingUserAuthSelector);
  const [isLoading, setIsLoading] = useState(false);

  // path change fake loading just for UI consistency
  // if another loading source switches to TRUE then loading would just continue
  const pathname = useAppSelector(uiPathnameSelector);
  const [pageChangedLoading, setPageChangedLoading] = useState(false);
  useEffect(() => {
    setPageChangedLoading(true);
    setTimeout(() => {
      setPageChangedLoading(false);
    }, Math.floor(Math.random() * (400 - 200)) + 200);
  }, [pathname]);

  useEffect(() => {
    // || dashboardLoadingStatus === 'loading' || smthElse === true ...
    if (
      searchEntitiesLoadingStatus === 'loading' ||
      userAuthLoadingStatus === 'loading' ||
      pageChangedLoading
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [searchEntitiesLoadingStatus, userAuthLoadingStatus, pageChangedLoading]);

  return { isLoading };
};

export { useLoadingTracker };
