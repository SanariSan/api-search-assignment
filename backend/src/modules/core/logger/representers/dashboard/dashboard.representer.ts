import { sleep } from '../../../../../helpers/util';
import { WidgetsInstancesController } from '../../../dashboard/controllers';
import { LogsStorage } from '../../storage';

class DashboardLogsRepresenter {
  public static readonly sourcePrefix = 'dashboard';

  private static readonly refreshRate = 1000 / 30; // fps

  public static getSources() {
    const sources = Object.keys(LogsStorage.getStorage());
    return sources.filter((sourceName) => sourceName.startsWith(this.sourcePrefix));
  }

  public static getLogsObject(sources: readonly string[]) {
    const sourcesTarget = sources.map((sourceName) =>
      sourceName.slice(sourceName.indexOf('-') + 1),
    );

    const storage = LogsStorage.getStorage();
    const storageTarget = Object.fromEntries(
      sources.map((source, i) => [sourcesTarget[i], [...storage[source].logs.values()]]),
    );

    return storageTarget;
  }

  private static present(logsObj: Readonly<Record<string, string[]>>) {
    WidgetsInstancesController.updateContent(logsObj);
  }

  public static async tick() {
    const sources = this.getSources();

    if (sources.length > 0) {
      const logsObj = this.getLogsObject(sources);
      this.present(logsObj);
    }

    await sleep(this.refreshRate);
    void this.tick();
  }
}

export { DashboardLogsRepresenter };
