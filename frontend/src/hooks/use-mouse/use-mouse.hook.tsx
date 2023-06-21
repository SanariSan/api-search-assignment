import { useWindowEvent } from '../use-window-event';

const useGlobalMouseUp = (callback: (ev: Event) => void) => {
  useWindowEvent('mouseup', callback);
};

const useGlobalMouseDown = (callback: (ev: Event) => void) => {
  useWindowEvent('mousedown', callback);
};

const useGlobalMouseMove = (callback: (ev: Event) => void) => {
  useWindowEvent('mousemove', callback);
};

export { useGlobalMouseUp, useGlobalMouseDown, useGlobalMouseMove };
