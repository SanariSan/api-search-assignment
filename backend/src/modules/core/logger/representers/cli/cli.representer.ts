import { mapFindIdx, mapSlice, sleep } from '../../../../../helpers/util';
import { LogsStorage } from '../../storage';

class CliLogsRepresenter {
  private static readonly sourcePrefix = 'cli';

  private static readonly lastAccessedLogId: Map<string, string> = new Map();

  private static readonly refreshRate = 1000 / 30; // fps

  private static getSources() {
    const sources = Object.keys(LogsStorage.getStorage());
    return sources.filter((sourceName) => sourceName.startsWith(this.sourcePrefix));
  }

  private static getNewLogs(source: string) {
    const { lastLogId, lastAccessedLogId, logs } = LogsStorage.accessSource(source);
    const lastAccessedLogIdLocal = this.lastAccessedLogId.get(source);

    if (lastAccessedLogIdLocal === lastAccessedLogId) {
      return [];
    }

    const idx = mapFindIdx(logs, { key: lastAccessedLogIdLocal });
    const newLogs = [...mapSlice(logs, idx + 1).values()];

    this.lastAccessedLogId.set(source, lastLogId);

    return newLogs;
  }

  private static present(logsArr: Readonly<string[]>) {
    logsArr.forEach((log) => {
      console.log(log);
    });
  }

  public static async tick() {
    const sources = this.getSources();
    const newLogsArrs: string[][] = sources.map((source) => this.getNewLogs(source));

    if (newLogsArrs.length > 0) {
      newLogsArrs.forEach((logsArr) => {
        this.present(logsArr);
      });
    }

    await sleep(this.refreshRate);
    void this.tick();
  }
}

export { CliLogsRepresenter };
