import { useEffect, useState } from 'react';

type TLazyImage = { lSrc: string; hSrc: string };
type TLazyImageReturn = [string, { blur: boolean }];

function useLazyImg({ lSrc, hSrc }: TLazyImage): TLazyImageReturn {
  const [src, setSrc] = useState(lSrc);

  useEffect(() => {
    setSrc(lSrc);

    const img = new Image();
    img.src = hSrc;

    const cb = () => {
      setSrc(hSrc);
      img.removeEventListener('load', cb);
    };

    img.addEventListener('load', cb);
  }, [lSrc, hSrc]);

  return [src, { blur: src === lSrc }];
}

export { useLazyImg };
