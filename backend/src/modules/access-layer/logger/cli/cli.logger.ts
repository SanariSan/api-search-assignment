import { CliLogsController } from '../../../core/logger/controllers';
import { GenericLogsReceiver } from '../../../core/logger/consumers';
import { CliLogsRepresenter } from '../../../core/logger/representers/cli';

function cliSubscribeChannel(channel: string) {
  GenericLogsReceiver.subscribeChannel({
    targetLogsController: CliLogsController,
    channel,
  });
}

function cliStartPolling() {
  void CliLogsRepresenter.tick();
}

export { cliSubscribeChannel, cliStartPolling };
