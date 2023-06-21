import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';

type TElementRef = MutableRefObject<HTMLElement | null>;

export function useIntersection({
  ref,
  shouldTrack = true,
}: {
  ref: TElementRef;
  shouldTrack?: boolean;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(() => {
    if (shouldTrack)
      return new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      });

    return;
  }, [shouldTrack]);

  useEffect(() => {
    if (!shouldTrack) return;
    if (observer === undefined) return;

    if (ref.current !== null) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, observer, shouldTrack]);

  return { isIntersecting };
}
