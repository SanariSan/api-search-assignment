function debounceWrap<TArgs extends unknown[]>(func: (...args: TArgs) => void, timeout = 750) {
  let timer: NodeJS.Timeout;
  function fn(...args: TArgs) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  }

  fn.cancel = () => {
    clearTimeout(timer);
  };

  return fn;
}

function debounceLeadingWrap<TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  timeout = 250,
) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: TArgs) => {
    if (timer === undefined) {
      func(...args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

function throttleWrap<TArgs extends unknown[]>(func: (...args: TArgs) => void, timeout = 250) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: TArgs) => {
    if (timer === undefined) {
      func(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    }
  };
}

export { debounceWrap, debounceLeadingWrap, throttleWrap };
