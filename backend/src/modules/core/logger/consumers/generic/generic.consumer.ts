import type { IPublishEntityCore } from '../../../pubsub';
import { SubCore } from '../../../pubsub';
import type { ITargetLogsController } from './generic.consumer.type';

class GenericLogsReceiver {
  // initialize subscriber instance
  private static readonly sub = new SubCore();

  public static subscribeChannel({
    targetLogsController,
    channel: customChannelName,
  }: {
    readonly targetLogsController: ITargetLogsController;
    readonly channel: string;
  }) {
    // LogsStorage.checkInitializeSource(`${targetLogsController.sourcePrefix}-${customChannelName}`);

    this.sub.subscribe(customChannelName);
    this.sub.on('message', ({ channel, logLevel, message }: IPublishEntityCore) => {
      if (channel === customChannelName) {
        // process message with channel/option name from closure and message
        void targetLogsController.processMessage({
          source: customChannelName,
          logLevel,
          message,
        });
      }
    });
  }
}

export { GenericLogsReceiver };
