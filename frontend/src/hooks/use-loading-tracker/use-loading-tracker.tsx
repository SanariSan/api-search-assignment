import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux';
import { loadingHistorySelector, loadingUserAuthSelector } from '../../store';

const useLoadingTracker = () => {
  const userAuthLoadingStatus = useAppSelector(loadingUserAuthSelector);
  const historyLoadingStatus = useAppSelector(loadingHistorySelector);
  const [isLoading, setIsLoading] = useState(false);

  // path change fake loading just for UI consistency
  // if another loading source switches to TRUE then loading would just continue
  const { pathname } = useLocation();
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
      userAuthLoadingStatus === 'loading' ||
      historyLoadingStatus === 'loading' ||
      pageChangedLoading
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [userAuthLoadingStatus, historyLoadingStatus, pageChangedLoading]);

  return { isLoading };
};

export { useLoadingTracker };
