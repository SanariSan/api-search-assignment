import PgPromise from 'pg-promise';

type TDbInstance = ReturnType<typeof PgPromise>;
type TDbPool = ReturnType<TDbInstance>;
type TInitializeParams = Exclude<Parameters<TDbInstance>[0], string>;

class PersistentDBConnectionManager {
  private static instance?: PersistentDBConnectionManager;

  private readonly pool: TDbPool;

  private readonly host: TInitializeParams['host'] = process.env.DB_HOST;

  private readonly port: TInitializeParams['port'] = Number(process.env.DB_PORT);

  private readonly user: TInitializeParams['user'] = process.env.DB_USER;

  private readonly database: TInitializeParams['database'] = process.env.DB_DATABASE_NAME;

  private readonly password: TInitializeParams['password'] = process.env.DB_PASSWORD;

  private readonly maxConnections: TInitializeParams['max'] = 25;

  private readonly connectionTimeoutMS: TInitializeParams['connectionTimeoutMillis'] = 5000;

  private readonly idleTimeoutMS: TInitializeParams['idleTimeoutMillis'] = 30_000;

  private constructor() {
    this.pool = PgPromise({
      capSQL: true,
    })({
      host: this.host,
      port: this.port,
      user: this.user,
      database: this.database,
      password: this.password,
      max: this.maxConnections,
      connectionTimeoutMillis: this.connectionTimeoutMS,
      idleTimeoutMillis: this.idleTimeoutMS,
    });
  }

  protected getPool() {
    return this.pool;
  }

  public getConnection() {
    return this.getPool();
  }

  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new PersistentDBConnectionManager();
    }

    return this.instance;
  }
}

export { PersistentDBConnectionManager };
