import blessed from 'blessed';
import { SCREEN_DEFAULT_PADDINGS } from '../../widgets.const';

function makeLogBox(parent) {
  return blessed.list({
    parent,
    label: ' Logs ',

    top: `${0}%`,
    left: `${30}%`,
    width: `${100 - 30}%`,
    height: `${80}%`,
    padding: SCREEN_DEFAULT_PADDINGS,

    scrollable: true,
    scrollbar: {
      ch: '=',
      inverse: false,
    },
    keys: true,
    tags: true, // {bold}{/bold}
    autoCommandKeys: true,
    border: {
      type: 'line',
    },
    style: {
      fg: 'white',
      border: {
        fg: 'white',
      },
      scrollbar: {
        bg: 'blue',
        fg: 'black',
      },
    },
  });
}

export { makeLogBox };
