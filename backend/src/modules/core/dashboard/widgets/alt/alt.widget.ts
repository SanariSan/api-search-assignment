import { WidgetsInstancesController } from '../../controllers';
import { makeControlsInfoBox, makeLogBox, makeWrapBox } from './box';

// TODO: review if (!smth) return; checks and replace with errors where needed
class WidgetAlt {
  private readonly widgetTitle: string;

  private autoScrollLogs = true;

  private wrapBox: any;

  private wrapBoxCb: any;

  private logBox: any;

  private logBoxCb: any;

  private controlsInfoBox: any;

  constructor() {
    this.widgetTitle = 'Dashboard-Alt';

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
    this.logBox = makeLogBox(this.wrapBox);
    this.controlsInfoBox = makeControlsInfoBox(this.wrapBox);
  }

  private configureBoxesCbs() {
    this.logBoxCb = () => {
      this.autoScrollLogs = !this.autoScrollLogs;
    };

    this.wrapBoxCb = (el): boolean | void => {
      if (el === this.wrapBox) {
        // Cancel propagation
        return false;
      }
    };
  }

  private allBoxesAssigned(): boolean {
    if (this.logBox !== undefined) return true;
    return false;
  }

  // *
  // init configuration section
  // -
  // runtime section
  // *

  // blessed lib forces to use mutation style to be able to swap widgets
  /* eslint-disable no-param-reassign */
  public appear(screen) {
    screen.append(this.wrapBox);
    screen.title = this.widgetTitle;

    this.setBoxesListeners();
    this.logBox.focus();
  }
  /* eslint-enable no-param-reassign */

  public disappear() {
    this.removeBoxesListeners();
    this.wrapBox.detach();
  }

  public updateContent(logsObj: Readonly<Record<string, string[]>>) {
    if (!this.allBoxesAssigned()) return;

    this.updateLogsBoxContent(logsObj);
  }

  private setBoxesListeners() {
    this.wrapBox.on('element keypress', this.wrapBoxCb);
    this.logBox.on('key s', this.logBoxCb);
  }

  private removeBoxesListeners() {
    this.wrapBox.off('element keypress', this.wrapBoxCb);
    this.logBox.off('key s', this.logBoxCb);
  }

  private updateLogsBoxContent(logsObj: Readonly<Record<string, string[]>>) {
    const logs = logsObj.all;

    this.logBox.setLabel(`  All Logs  `);

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

export { WidgetAlt };
