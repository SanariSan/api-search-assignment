import { ELOG_LEVEL } from '../../../../../general.type';
import { GenericError } from '../../../../../error';
import type { ILogEntity } from '../../consumers/generic';
import { LogsStorage } from '../../storage';

// TODO: provide routines for changing max lines number for source in LogStorage
// TODO: format string in printf format, use util.format
class DashboardLogsController {
  public static readonly sourcePrefix = 'dashboard';

  private static formatMultiline(str: string, maxLineLength: number) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp) ?? [];

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }

  private static getFormattedLog({ logLevel, message }: ILogEntity): string[] {
    if (message instanceof Error) {
      return this.formatMultiline(
        `(${ELOG_LEVEL[logLevel]}): ${GenericError.getFormatted(message)}`,
        87,
      );
    }

    return this.formatMultiline(`(${ELOG_LEVEL[logLevel]}): ${JSON.stringify(message)}`, 87);
  }

  public static async processMessage(messageEntity: ILogEntity) {
    const logsArr = this.getFormattedLog(messageEntity);

    // push log lines to hash-log map
    const { source } = messageEntity;
    await LogsStorage.updateLogs(`${this.sourcePrefix}-${source}`, logsArr);
    await LogsStorage.updateLogs(`${this.sourcePrefix}-all`, logsArr);
  }
}

export { DashboardLogsController };
