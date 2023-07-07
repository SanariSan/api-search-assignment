import { ELOG_LEVEL } from '../../../general.type';
import { publishError, publishLog } from '../../../modules/access-layer/events/pubsub';
import { AbortError } from '../../../services';

/**
 * switch with a set of actions for each system error
 * this should be pretty much consistent between different projects
 * maybe do some report call, cleanup or anything else
 *
 * this switch handler hits only when request failed for some internal reason, not bad response
 */
function* processSystemError({ classifiedSystemError: e }: { classifiedSystemError: Error }) {
  publishError(ELOG_LEVEL.DEBUG, e);

  switch (true) {
    case e instanceof AbortError: {
      publishLog(ELOG_LEVEL.DEBUG, 'Abort error case');
      break;
    }
    default: {
      publishLog(ELOG_LEVEL.DEBUG, 'Default unexpected error case');
      break;
    }
  }

  yield;
}

export { processSystemError };
