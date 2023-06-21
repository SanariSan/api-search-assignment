import blessed from 'blessed';
import { SCREEN_DEFAULT_PADDINGS } from '../../widgets.const';

function makeControlsInfoBox(parent) {
  return blessed.text({
    parent,
    label: ' Controls ',

    top: `${80}%`,
    left: `${0}%`,
    width: `${100}%`,
    height: `${20}%`,
    padding: SCREEN_DEFAULT_PADDINGS,

    tags: true,
    border: {
      type: 'line',
    },
    style: {
      fg: 'white',
      border: {
        fg: 'white',
      },
    },

    valign: 'top',
    content:
      '{cyan-fg}{bold}Shift + Left/Right: switch dashboards{/}\n' +
      '{blue-fg}{bold}S: toggle auto scroll{/}\n' +
      '{magenta-fg}{bold}Left/Right: switch boxes{/}\n' +
      '{yellow-fg}{bold}Up/Down/Mouse: scroll{/}\n' +
      '{red-fg}{bold}Ctrl + C / Q / Esc: exit {/}',
  });
}
export { makeControlsInfoBox };
