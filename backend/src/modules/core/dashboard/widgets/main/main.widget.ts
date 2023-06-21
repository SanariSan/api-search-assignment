import { WidgetsInstancesController } from '../../controllers';
import { makeControlsInfoBox, makeLogBox, makeMenuBox, makeWrapBox } from './box';

class WidgetMain {
  private readonly widgetTitle: string;

  private wrapBox: any;

  private wrapBoxCb: any;

  private menuBox: any;

  private menuBoxCb: any;

  private logBox: any;

  private logBoxCb: any;

  private controlsInfoBox: any;

  private autoScrollLogs = true;

  private boxesSwitch: any[] = [];

  private currentBoxIdx = 0;

  constructor() {
    this.widgetTitle = 'Dashboard-Main';

    // save this instance ; init screen if not done yet
    WidgetsInstancesController.init(this);

    this.initializeBoxes();
    this.configureBoxesCbs();
  }

  // init configuration section
  // *

  private initializeBoxes() {
    // create predefined screen components = boxes
    this.wrapBox = makeWrapBox();
    this.menuBox = makeMenuBox(this.wrapBox);
    this.logBox = makeLogBox(this.wrapBox);
    this.controlsInfoBox = makeControlsInfoBox(this.wrapBox);

    // store switchable boxes
    this.boxesSwitch = [this.menuBox, this.logBox];
  }

  private configureBoxesCbs() {
    this.menuBoxCb = () => {
      this.logBox.clearItems();
    };

    this.logBoxCb = () => {
      this.autoScrollLogs = !this.autoScrollLogs;
    };

    this.wrapBoxCb = (el, ch, key): boolean | void => {
      // remove accent from current box
      this.boxesSwitch[this.currentBoxIdx].style.border.fg = 'white';

      // carousel box idx change
      if (key.name === 'left') {
        this.currentBoxIdx -= 1;
        this.currentBoxIdx =
          this.currentBoxIdx < 0 ? this.boxesSwitch.length - 1 : this.currentBoxIdx;
      } else if (key.name === 'right') {
        this.currentBoxIdx += 1;
        this.currentBoxIdx = this.currentBoxIdx >= this.boxesSwitch.length ? 0 : this.currentBoxIdx;
      }

      // accent new current box
      this.boxesSwitch[this.currentBoxIdx].focus();
      this.boxesSwitch[this.currentBoxIdx].style.border.fg = 'blue';

      if (el === this.wrapBox) {
        // Cancel propagation
        return false;
      }
    };
  }

  private allBoxesAssigned(): boolean {
    if (
      this.menuBox !== undefined &&
      this.logBox !== undefined &&
      this.controlsInfoBox !== undefined
    )
      return true;
    return false;
  }

  // *
  // init configuration section
  // -
  // runtime section
  // *

  /* eslint-disable no-param-reassign */
  // blessed lib forces to use mutation style to be able to swap widgets
  public appear(screen) {
    screen.append(this.wrapBox);
    screen.title = this.widgetTitle;

    this.setBoxesListeners();
    this.menuBox.focus();
  }
  /* eslint-enable no-param-reassign */

  public disappear() {
    this.removeBoxesListeners();
    this.wrapBox.detach();
  }

  public updateContent(logsObj: Readonly<Record<string, string[]>>) {
    if (!this.allBoxesAssigned()) return;

    this.updateMenuBoxContent(logsObj);
    this.updateLogsBoxContent(logsObj);
  }

  private setBoxesListeners() {
    this.wrapBox.on('element keypress', this.wrapBoxCb);
    this.menuBox.on('select item', this.menuBoxCb);
    this.logBox.on('key s', this.logBoxCb);
  }

  private removeBoxesListeners() {
    this.wrapBox.off('element keypress', this.wrapBoxCb);
    this.menuBox.off('select item', this.menuBoxCb);
    this.logBox.off('key s', this.logBoxCb);
  }

  private updateMenuBoxContent(logsObj: Readonly<Record<string, string[]>>) {
    // cut "all" source, not necessary!
    const sources = Object.keys(logsObj);
    const options = sources.filter((el) => el !== 'all');

    if (options.length === 0) {
      return;
    }

    // if there's different amount of options came - clear old ones
    if (options.length !== this.menuBox.items.length) {
      this.menuBox.clearItems();
      this.menuBox.setItems(options);
    }
  }

  private updateLogsBoxContent(logsObj: Readonly<Record<string, string[]>>) {
    // cut "all" source, not necessary!
    const sources = Object.keys(logsObj);
    const options = sources.filter((el) => el !== 'all');

    if (options.length === 0) {
      return;
    }

    const selectedOptionName = options[this.menuBox.selected];
    this.logBox.setLabel(`  ${selectedOptionName} Logs  `);

    const logs = logsObj[selectedOptionName];

    if (logs.length === 0) {
      this.logBox.setItems(['No logs yet']);
      return;
    }

    this.logBox.setItems(logs);

    if (this.autoScrollLogs) {
      this.logBox.setScrollPerc(100);
    }
  }

  // *
  // runtime section
}

export { WidgetMain };
