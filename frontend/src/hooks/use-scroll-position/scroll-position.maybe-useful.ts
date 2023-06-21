import type { DependencyList, MutableRefObject } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';

interface IPosition {
  x: number;
  y: number;
}

interface IScrollProps {
  prevPos: IPosition;
  currPos: IPosition;
}

type TElementRef = MutableRefObject<HTMLElement | undefined>;

const isBrowser = typeof window !== `undefined`;
const zeroPosition = { x: 0, y: 0 };

const getClientRect = (element?: HTMLElement) => element?.getBoundingClientRect();

const getScrollPosition = ({
  element,
  useWindow,
  boundingElement,
}: {
  element?: TElementRef;
  boundingElement?: TElementRef;
  useWindow: boolean;
}) => {
  if (!isBrowser) return zeroPosition;
  if (useWindow) return { x: window.scrollX, y: window.scrollY };

  const targetPosition = getClientRect(element?.current ?? document.body);
  if (targetPosition === undefined) return zeroPosition;

  if (boundingElement !== undefined && boundingElement.current !== undefined) {
    const containerPosition = getClientRect(boundingElement.current);

    if (containerPosition !== undefined) {
      return {
        x: containerPosition.x - targetPosition.x,
        y: containerPosition.y - targetPosition.y,
      };
    }
  }

  return { x: targetPosition.left, y: targetPosition.top };
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useScrollPosition = ({
  effect,
  deps = [],
  element,
  useWindow = false,
  delay,
  boundingElement,
}: {
  effect: (props: IScrollProps) => void;
  deps?: DependencyList;
  element?: TElementRef;
  useWindow?: boolean;
  delay?: number;
  boundingElement?: TElementRef;
}): void => {
  const position = useRef(getScrollPosition({ useWindow, element, boundingElement }));

  let throttleTimeout: number | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow, boundingElement });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  const handleScroll = () => {
    if (delay === undefined) {
      callBack();
      return;
    }

    if (throttleTimeout === null) {
      throttleTimeout = window.setTimeout(callBack, delay);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (boundingElement) {
      boundingElement.current?.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (boundingElement) {
        boundingElement.current?.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }

      if (throttleTimeout !== null) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};
