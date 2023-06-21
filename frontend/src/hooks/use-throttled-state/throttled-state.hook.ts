import { useEffect, useRef, useState } from 'react';

export const useThrottledState = <TState>({
  state,
  replicateCondition,
  delay,
}: {
  state: TState;
  replicateCondition: boolean;
  delay: number;
}) => {
  const [throttledStateReplica, setThrottledStateReplica] = useState(state);
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!replicateCondition) {
      setThrottledStateReplica(state);
      return;
    }

    clearTimeout(timerRef.current);

    // extra delay before replication
    timerRef.current = setTimeout(() => {
      setThrottledStateReplica(state);
      return;
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [state, replicateCondition, delay]);

  return throttledStateReplica;
};
