const getTouchStatus = () =>
  // @ts-expect-error msMaxTouchPoints only supported in IE10
  'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// https://stackoverflow.com/a/29504900
const getScreenResolutionDetails = () => ({
  // innerWH as default
  default: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
  cssPixels: {
    // full screen size
    wh: {
      w: window.screen.width,
      h: window.screen.height,
    },
    // full screen size (css pixels) *-minus-* windows panel row (when f11 full screen enabled still reports same size)
    availWH: {
      w: window.screen.availWidth,
      h: window.screen.availHeight,
    },
    // recommended one of following
    // full screen size *-minus-* windows panel row *-minus-* browser top row (when f11 full screen enabled also reports correct size)
    clientWH: {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    },
    innerWH: {
      w: window.innerWidth,
      h: window.innerHeight,
    },
  },
  realPixels: {
    // full screen size (real pixels), useful for svg scaling
    wh: {
      w: window.screen.width * window.devicePixelRatio,
      h: window.screen.height * window.devicePixelRatio,
    },
    // ratio shows system + browser zoom factor (125% in windows settings = 1.25 here)
    ratio: window.devicePixelRatio,
  },
});

const getScreenDetails = () => ({
  isTouchAvailable: getTouchStatus(),
  screenResolutionDetails: getScreenResolutionDetails(),
});

export { getScreenDetails, getTouchStatus, getScreenResolutionDetails };
