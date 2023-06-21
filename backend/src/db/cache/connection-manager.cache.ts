import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

class CacheDBConnectionManager {
  private static instance?: CacheDBConnectionManager;

  private readonly client: RedisClientType;

  private readonly host: string = process.env.CACHE_HOST;

  private readonly port: number = Number(process.env.CACHE_PORT);

  private readonly user: string = '';

  private readonly database: string = '0';

  private readonly password: string = process.env.CACHE_PASSWORD;

  private constructor() {
    this.client = createClient({
      url: `redis://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`,
      socket: {
        reconnectStrategy(retries: number) {
          return 5000;
        },
      },
      legacyMode: true,
    });

    this.client.on('connect', () => {
      console.log('Redis re/connected');
    });

    // catching socket event error, otherwise it'll crash whole app
    this.client.on('error', (error) => {
      // wiping instance to let user initialize fresh
      // but since using built-in reconnect strategy it has no use
      // CacheDBConnectionManager.instance = undefined;
      console.error(`Redis connection error: ${(error as Error).message}`);
    });

    void this.client.connect().catch(() => {
      // silently catching connection error, because handled above
    });
  }

  protected getClient() {
    return this.client;
  }

  public getConnection() {
    return this.getClient();
  }

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new CacheDBConnectionManager();
    }

    return this.instance;
  }
}

export { CacheDBConnectionManager };
