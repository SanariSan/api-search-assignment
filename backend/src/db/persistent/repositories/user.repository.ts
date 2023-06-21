import { PersistentDBConnectionManager } from '../connection-manager.persistent';
import { USER as sql } from '../sql';

type TUser = { id: number; email: string; username: string; passwordhash: string };

class UserRepository {
  private static getConnection() {
    return PersistentDBConnectionManager.getInstance().getConnection();
  }

  static findByEmail({ email }: { email: string }) {
    return this.getConnection().one<TUser>(sql.findByEmail, [email]);
  }

  static findByUsername({ username }: { username: string }) {
    return this.getConnection().one<TUser>(sql.findByUsername, [username]);
  }

  static findNoneByEmailOrUsername({ email, username }: { email: string; username: string }) {
    return this.getConnection().none(sql.findByEmailOrUsername, [email, username]);
  }

  static insert({
    email,
    username,
    hashedPassword,
  }: {
    email: string;
    username: string;
    hashedPassword: string;
  }) {
    return this.getConnection().one<TUser>(sql.insert, [email, username, hashedPassword]);
  }

  static updatePassword({
    username,
    hashedPassword,
  }: {
    username: string;
    hashedPassword: string;
  }) {
    return this.getConnection().one<TUser>(sql.updatePassword, [username, hashedPassword]);
  }
}

export { UserRepository };

/**
 *    import { errors } from 'pg-promise';
 *    
 *    const errorCast = error as errors.QueryResultError;
      if (errorCast.code === errors.queryResultErrorCode.noData) {
        // expected some data, got none
      } else if (errorCast.code === errors.queryResultErrorCode.multiple) {
        // expected just a single record, got multiple records
      } else if (errorCast.code === errors.queryResultErrorCode.notEmpty) {
        // expected no data, got something
      } else {
        // syntax error
      }
 */

/**
 * Return types not derived right (just shows all of them at call place), have tried: 
 * 
 * type TQueryMode = Extract<
    keyof ReturnType<ReturnType<typeof DBPoolConnectionManager['getInstance']>['getPool']>,
    'any' | 'one' | 'many' | 'none' | 'oneOrNone' | 'manyOrNone'
    >;
 * 
 * static findByEmail<TMode extends TQueryMode>(
    { email }: { email: string },
    { mode }: { mode: TMode },
  ) {
    if (mode === 'any') {
      return this.getConnection()[mode]<TUser>(sql.findByEmail, [email]) as Promise<TUser[]>;
    }
    if (mode === 'one')
      return this.getConnection().one<TUser>(sql.findByEmail, [email]) as Promise<TUser>;
    if (mode === 'many')
      return this.getConnection().many<TUser>(sql.findByEmail, [email]) as Promise<TUser[]>;
    if (mode === 'none')
      return this.getConnection().none(sql.findByEmail, [email]) as Promise<null>;
    if (mode === 'oneOrNone')
      return this.getConnection().oneOrNone<TUser>(sql.findByEmail, [
        email,
      ]) as Promise<TUser | null>;
    if (mode === 'manyOrNone')
      return this.getConnection().manyOrNone<TUser>(sql.findByEmail, [email]) as Promise<
        TUser[] | null
      >;
  }
 * 
 * ----------------------------------------------------------------
 * 
 * static findByEmail<T extends TQueryMode>({ email }: { email: string }, { mode }: { mode: T }) {
    return this.getConnection()[mode]<TUser>(sql.findByEmail, [email]);
    }
 * 
 * Result at call place - TUser | TUser[] | null
 * 
 */
