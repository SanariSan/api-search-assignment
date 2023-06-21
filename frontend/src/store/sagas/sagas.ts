import { all, call, spawn } from 'redux-saga/effects';
import { ELOG_LEVEL } from '../../general.type';
import { publishError } from '../../modules/access-layer/events/pubsub';
import { entitiesRootWatcher } from './entities';
import { loadingRootWatcher } from './loading';
import { userAuthRootWatcher } from './user';

function* rootWatcher() {
  const sagas = [entitiesRootWatcher, userAuthRootWatcher, loadingRootWatcher];

  yield all(
    sagas.map((saga) =>
      spawn(function* detachedGenerator() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            publishError(ELOG_LEVEL.DEBUG, error as Error);
          }
        }
      }),
    ),
  );
}

export { rootWatcher };
