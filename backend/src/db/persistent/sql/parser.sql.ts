import path from 'path';
import { QueryFile } from 'pg-promise';

// Helper for linking to external query files
function sql(file: string): QueryFile {
  /* eslint-disable unicorn/prefer-module */
  const qf: QueryFile = new QueryFile(path.join(__dirname, file), {
    minify: true,
  });

  if (qf.error !== undefined) {
    console.error(qf.error);
  }

  return qf;
}

export const USER = {
  findByEmail: sql('user/find-by-email.sql'),
  findByUsername: sql('user/find-by-username.sql'),
  findByEmailOrUsername: sql('user/find-by-email-or-username.sql'),
  insert: sql('user/insert.sql'),
  updatePassword: sql('user/update-password.sql'),
};
