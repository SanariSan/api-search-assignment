import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useThrottle } from '../use-throttle';

type TElementRef = MutableRefObject<HTMLElement | null>;

export const useElementScrollPosition = ({
  elementRef,
  endOffset = 100,
}: {
  elementRef: TElementRef;
  endOffset?: number;
}) => {
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isElementEnd, setIsElementEnd] = useState(false);

  const updateCb = useCallback(() => {
    if (elementRef.current === null) return;

    const { width, height } = elementRef.current.getBoundingClientRect();
    setW(width);
    setH(height);
    setScrollHeight(elementRef.current.scrollHeight);
    setScrollTop(elementRef.current.scrollTop);

    // console.log(
    //   elementRef.current.scrollHeight,
    //   elementRef.current.scrollTop,
    //   height,
    //   elementRef.current.scrollHeight - (elementRef.current.scrollTop + height),
    //   endOffset,
    // );

    if (
      elementRef.current.scrollTop >= 0 &&
      elementRef.current.scrollHeight - (elementRef.current.scrollTop + height) <= endOffset
    ) {
      setIsElementEnd(true);
    } else {
      setIsElementEnd(false);
    }
  }, [elementRef, endOffset]);

  const [update] = useThrottle({ cb: updateCb, delay: 250 });

  useEffect(() => {
    let el: Exclude<TElementRef['current'], null>;
    let initTimer: NodeJS.Timeout;
    let keepAliveTimer: NodeJS.Timeout;

    const cb = () => {
      // if el in current set listener and exit
      if (elementRef.current !== null) {
        el = elementRef.current;
        el.addEventListener('scroll', update);

        const updWrap = () => {
          update();
          keepAliveTimer = setTimeout(updWrap, 2000);
        };

        updWrap();
        return;
      }

      // or retry until el appears in current
      initTimer = setTimeout(cb, 100);
    };

    cb();

    return () => {
      el.removeEventListener('scroll', update);
      clearTimeout(initTimer);
      clearTimeout(keepAliveTimer);
    };
  }, [update, elementRef]);

  return {
    w,
    h,
    scrollHeight,
    scrollTop,
    isElementEnd,
  };
};

export const useWindowScrollPosition = ({
  startOffset = 0,
  endOffset = 100,
}: {
  startOffset?: number;
  endOffset?: number;
}) => {
  const [x, setX] = useState(window.pageXOffset);
  const [y, setY] = useState(window.pageYOffset);

  const [isPageStart, setIsPageStart] = useState(true);
  const [isPageEnd, setIsPageEnd] = useState(false);

  const update = () => {
    setX(window.pageXOffset);
    setY(window.pageYOffset);
    setIsPageStart(window.pageYOffset <= startOffset);

    const documentHeight = document.body.scrollHeight;
    const currentBottomSidePosition = window.pageYOffset + window.innerHeight;

    setIsPageEnd(currentBottomSidePosition + endOffset >= documentHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('scroll', update);
    };
  });

  return { x, y, isPageStart, isPageEnd };
};
