import { EventEmitter } from 'node:events';
import { dashboardShow, dashboardWidgetGet } from '../modules/access-layer/dashboard';
import {
  dashboardStartPolling,
  dashboardSubscribeChannel,
} from '../modules/access-layer/logger/dashboard';

function setupDashboard() {
  const MainWidget = dashboardWidgetGet('main');
  const AltWidget = dashboardWidgetGet('alt');
  const mainInstance = new MainWidget();
  const altInstance = new AltWidget();

  // tweak listeners amount
  EventEmitter.defaultMaxListeners = 150;

  // subscribe to all channels needed (can add later, these are basic)
  dashboardSubscribeChannel('log');
  dashboardSubscribeChannel('error-expected');
  dashboardSubscribeChannel('error-unexpected');

  dashboardStartPolling();

  // show preferred dashboard by passing instance
  dashboardShow(mainInstance);
}

export { setupDashboard };
