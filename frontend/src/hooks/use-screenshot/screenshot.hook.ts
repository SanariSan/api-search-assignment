import type { Options } from 'html2canvas';
import html2canvas from 'html2canvas';
import { useCallback, useState } from 'react';

type TMimeType = 'image/bmp' | 'image/jpeg' | 'image/x-png' | 'image/png' | 'image/gif';
type TEncoderOptions = number;
type TUseScreenshotArguments = {
  type?: TMimeType;
  quality?: TEncoderOptions;
};

const useScreenshot = ({ type = 'image/png', quality = 1 }: TUseScreenshotArguments = {}) => {
  const [image, setImage] = useState<string>();
  const [error, setError] = useState<unknown>();

  const takeScreenshot = useCallback(
    async ({
      node,
      options,
    }: {
      node: HTMLElement | null;
      options: Partial<Options> | undefined;
    }) => {
      if (node === null) throw new Error('You should provide correct html node.');

      try {
        const canvas = await html2canvas(node, {
          backgroundColor: null,
          scale: 1,
          foreignObjectRendering: false,
          logging: false,
          useCORS: false,
          ...options,
        });
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');

        if (croppedCanvasContext === null)
          throw new Error('Browser does not support canvas 2d context.');

        // crop weird 1px border (just scaling)
        // const cropPositionTop = -1;
        // const cropPositionLeft = -1;
        const cropPositionTop = 0;
        const cropPositionLeft = 0;

        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;

        croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

        const base64Image = croppedCanvas.toDataURL(type, quality);

        setImage(base64Image);
      } catch (error_) {
        setError(error_);
      }
    },
    [quality, type],
  );

  return {
    image,
    takeScreenshot,
    error,
  };
};

export { useScreenshot };
export type { TMimeType, TEncoderOptions, TUseScreenshotArguments };
