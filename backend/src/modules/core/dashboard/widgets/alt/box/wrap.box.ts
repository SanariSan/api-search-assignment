import blessed from 'blessed';

function makeWrapBox() {
  return blessed.box({
    top: `${0}%`,
    left: `${0}%`,
    width: `${100}%`,
    height: `${100}%`,
    padding: 0,

    keys: true,
  });
}
export { makeWrapBox };
