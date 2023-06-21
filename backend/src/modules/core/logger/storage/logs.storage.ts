import { isValidString, mapSlice, randomHex, sleep } from '../../../../helpers/util';
import type { TLog, TSource, TStorage } from './logs.storage.type';

/**
 * Storage allows you to store fixed amount of logs at runtime
 * So you can access it whenever needed and represent in a way needed
 *
 * However, it's not really suitable for representers which need
 * 1 log entity at a time AND/OR don't need access to logs history
 *
 * In this case you should store a hash of last accessed log on representers' side
 * When next time accessing storage - find last log position by hash and parse trailing, then update last accessed hash
 *
 */

// TODO: throw error if not valid string passed (?)
class LogsStorage {
  private static readonly defaultmaxSize = 150;

  private static readonly defaultRotateMs = 5000;

  private static readonly logsStorage: TStorage = {};

  public static getStorage(): TStorage {
    return this.logsStorage;
  }

  public static getSource(source: string): TSource {
    this.checkInitializeSource(source);

    return this.logsStorage[source];
  }

  public static accessSource(source: string): TSource {
    this.checkInitializeSource(source);

    // get all current primitive values
    const { lastAccessedLogId, lastLogId, maxSize } = this.logsStorage[source];
    // get copies of all current referenced values
    const logs = new Map(this.logsStorage[source].logs.entries());

    // change everything needs to be changed when "accessing" performed ; this case - lastAccessedLogId
    this.logsStorage[source].lastAccessedLogId = this.logsStorage[source].lastLogId;

    // return old values
    return {
      maxSize,
      lastLogId,
      lastAccessedLogId,
      logs,
    };
  }

  public static async updateLogs(source: string, value: readonly TLog[]) {
    this.checkInitializeSource(source);

    // because the order is important - can't use Promise.all[settled]
    // because could be numerous logs - can't afford calling randomHex gen synchronously
    /* eslint-disable no-await-in-loop */
    for (const line of value) {
      const id = await randomHex();
      this.logsStorage[source].logs.set(id, line);
      this.logsStorage[source].lastLogId = id;
    }
  }

  public static checkInitializeSource(source: string) {
    if (isValidString(source)) {
      this.logsStorage[source] ??= {
        maxSize: this.defaultmaxSize,
        lastLogId: '',
        lastAccessedLogId: '',
        logs: new Map(),
      };
    } else {
      throw new Error('TODO');
    }
  }

  public static async rotateLogs() {
    Object.keys(this.logsStorage).forEach((sourceKey) => {
      const source = this.logsStorage[sourceKey];
      const logsMap = source.logs;

      if (logsMap.size >= source.maxSize) {
        const diff = logsMap.size - source.maxSize;

        source.logs = mapSlice(logsMap, diff);
      }
    });

    await sleep(this.defaultRotateMs);

    void this.rotateLogs();
  }
}

void LogsStorage.rotateLogs();

export { LogsStorage };
