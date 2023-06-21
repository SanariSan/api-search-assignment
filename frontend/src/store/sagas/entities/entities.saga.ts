import { all, call } from 'redux-saga/effects';
import { searchWatcher } from './search.entities.saga';

function* entitiesRootWatcher() {
  yield all([call(searchWatcher)]);
}

export { entitiesRootWatcher };
