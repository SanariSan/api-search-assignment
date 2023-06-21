import { ELOG_LEVEL } from './general.type';
import type { IPublishEntity } from './modules/access-layer/events/pubsub';
import { Sub } from './modules/access-layer/events/pubsub';

const cb = ({ channel, logLevel, message }: IPublishEntity) => {
  const logLevelAccept =
    process.env.REACT_APP_NODE_ENV === 'development' ? ELOG_LEVEL.DEBUG : ELOG_LEVEL.INFO;
  if (logLevel > logLevelAccept) return;

  if (channel === 'log') {
    console.log('%s |', ELOG_LEVEL[logLevel], message);
  } else if (channel === 'error-expected' || channel === 'error-unexpected') {
    console.error('%s |', ELOG_LEVEL[logLevel], message);
  } else {
    return;
  }
};

function setupLogListener() {
  const sub = new Sub();

  sub.subscribe('log');
  sub.subscribe('error-expected');
  sub.subscribe('error-unexpected');
  sub.listen(cb);
}

export { setupLogListener };
