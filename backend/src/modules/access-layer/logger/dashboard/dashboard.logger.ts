import { DashboardLogsController } from '../../../core/logger/controllers';
import { GenericLogsReceiver } from '../../../core/logger/consumers';
import { DashboardLogsRepresenter } from '../../../core/logger/representers';

function dashboardSubscribeChannel(channel: string) {
  GenericLogsReceiver.subscribeChannel({
    targetLogsController: DashboardLogsController,
    channel,
  });
}

function dashboardStartPolling() {
  void DashboardLogsRepresenter.tick();
}

export { dashboardSubscribeChannel, dashboardStartPolling };
