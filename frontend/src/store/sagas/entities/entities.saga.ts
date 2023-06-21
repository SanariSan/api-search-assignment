import { all, call } from 'redux-saga/effects';
import { sideChainWatcher } from './side-chains.entities';
import { searchWatcher } from './search.entities.saga';

function* entitiesRootWatcher() {
  yield all([call(sideChainWatcher), call(searchWatcher)]);
}

export { entitiesRootWatcher };
