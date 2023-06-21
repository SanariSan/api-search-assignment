import {
  setupCli,
  setupPersistentDb,
  setupErrorHandle,
  setupExpress,
  setupValidateEnv,
  setupCacheDb,
} from './setup';

// function test() {}

/* eslint-disable @typescript-eslint/require-await */

async function init() {
  console.dir(process.env);

  setupValidateEnv();
  setupErrorHandle();
  setupCli();
  //  setupDashboard();
  await setupCacheDb();
  // await setupPersistentDb();
  setupExpress();

  // test();
}

void init();
