import type { Session } from 'express-session';

class SessionManager {
  static regenerate({ session }: { session: Session }) {
    return new Promise<void>((resolve, reject) => {
      session.regenerate((err) => {
        if (err !== undefined && err !== null) {
          reject();
        }
        resolve();
      });
    });
  }

  static save({ session }: { session: Session }) {
    return new Promise<void>((resolve, reject) => {
      session.save((err) => {
        if (err !== undefined && err !== null) {
          reject();
        }
        resolve();
      });
    });
  }

  static destroy({ session }: { session: Session }) {
    return new Promise<void>((resolve, reject) => {
      session.destroy((err) => {
        if (err !== undefined && err !== null) {
          reject();
        }
        resolve();
      });
    });
  }
}

export { SessionManager };
