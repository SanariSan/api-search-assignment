import { Button } from '@chakra-ui/react';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Persistor } from '../../../store';

const ErrorFallbackComponent: FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    }}
  >
    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>💀 Something went terribly wrong 💀</p>
    <Button
      type={'button'}
      onClick={() => {
        resetErrorBoundary();
      }}
    >
      {/* onClick={resetErrorBoundary} */}
      Reload page
    </Button>
  </div>
);

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // E.g. log to an error logging client here
  console.group('err');
  console.log(error.message);
  console.log(error.stack);
  console.log(info.componentStack);
  console.groupEnd();
};

const ErrorBoundaryGenericContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const a = 1;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallbackComponent}
      onError={myErrorHandler}
      onReset={() => {
        // reset the state of app, reload the page
        void Persistor.purge().then(() => {
          window.location.reload();
          return;
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorBoundaryGenericContainerMemo = memo(ErrorBoundaryGenericContainer);

export { ErrorBoundaryGenericContainerMemo };
