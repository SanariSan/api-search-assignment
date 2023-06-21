import blessed from 'blessed';
import type { TWidgetInstance } from './instances.controllers.type';

class WidgetsInstancesController {
  private static screen: any = undefined;

  private static readonly widgetsInstances = new Array<TWidgetInstance>();

  private static currWidgetIdx = 0;

  private static screenSwapCb: any;

  private static screenExitCb: any;

  private static updateCurrentDashboardIdx(widgetInstance: TWidgetInstance) {
    const currWidgetIdx = this.widgetsInstances.indexOf(widgetInstance);
    this.currWidgetIdx = currWidgetIdx !== -1 ? currWidgetIdx : 0;
  }

  private static configureScreenCbs() {
    // shift+lef/right for dashboads swap
    this.screenSwapCb = (ch, key) => {
      this.hide(this.widgetsInstances[this.currWidgetIdx]);

      // carousel idx change
      if (key.full === 'S-left') {
        this.currWidgetIdx -= 1;
        this.currWidgetIdx =
          this.currWidgetIdx < 0 ? this.widgetsInstances.length - 1 : this.currWidgetIdx;
      } else if (key.full === 'S-right') {
        this.currWidgetIdx += 1;
        this.currWidgetIdx =
          this.currWidgetIdx >= this.widgetsInstances.length ? 0 : this.currWidgetIdx;
      }

      this.show(this.widgetsInstances[this.currWidgetIdx]);
    };

    // ctrl+c / escape = destroy screens + exit
    this.screenExitCb = () => {
      this.screen.destroy();
      process.exit(0);
    };
  }

  private static setScreenListeners() {
    this.screen.key(['S-left', 'S-right'], this.screenSwapCb);
    this.screen.key(['escape', 'C-c', 'q'], this.screenExitCb);
  }

  private static render() {
    this.screen.render();
  }

  public static init(widgetInstance: TWidgetInstance) {
    // save dashboard instance
    this.widgetsInstances.push(widgetInstance);

    if (this.screen === undefined) {
      this.screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true,
      });
      this.configureScreenCbs();
      this.setScreenListeners();
    }
    this.render();
  }

  public static show(widgetInstance: TWidgetInstance) {
    this.updateCurrentDashboardIdx(widgetInstance);
    widgetInstance.appear(this.screen);
    this.render();
  }

  public static hide(widgetInstance: TWidgetInstance) {
    this.updateCurrentDashboardIdx(widgetInstance);
    widgetInstance.disappear();
    this.render();
  }

  public static updateContent(logsObj: Readonly<Record<string, string[]>>) {
    this.widgetsInstances[this.currWidgetIdx].updateContent(logsObj);
    this.render();
  }
}

export { WidgetsInstancesController };
