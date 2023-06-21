import { ELOG_LEVEL } from '../../../../../general.type';
import { GenericError } from '../../../../../error';
import type { ILogEntity } from '../../consumers/generic';
import { LogsStorage } from '../../storage';

// TODO: provide routines for changing max lines number for source in LogStorage
// TODO: format string in printf format, use util.format
class CliLogsController {
  public static readonly sourcePrefix = 'cli';

  private static getFormattedLog({ source, logLevel, message }: ILogEntity): string[] {
    if (message instanceof Error) {
      return [`${source}(${ELOG_LEVEL[logLevel]}): ${GenericError.getFormatted(message)}`];
    }

    return [`${source}(${ELOG_LEVEL[logLevel]}): ${JSON.stringify(message)}`];
  }

  public static async processMessage(messageEntity: ILogEntity) {
    const logsArr = this.getFormattedLog(messageEntity);
    const { source } = messageEntity;

    // push log lines to hash-log map
    await LogsStorage.updateLogs(`${this.sourcePrefix}-${source}`, logsArr);
  }
}

export { CliLogsController };
