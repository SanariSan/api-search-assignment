import { EventEmitter } from 'node:events';
import { cliStartPolling, cliSubscribeChannel } from '../modules/access-layer/logger/cli';

function setupCli() {
  // tweak listeners amount
  EventEmitter.defaultMaxListeners = 150;

  // subscribe to all channels needed (can add later, these are basic)
  cliSubscribeChannel('log');
  cliSubscribeChannel('error-expected');
  cliSubscribeChannel('error-unexpected');

  cliStartPolling();
}

export { setupCli };
