import type { History } from 'history';
import type { FC } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

/**
 * This little hack allows to catch history object and change it outside component
 * withRouter() wrapper catches history changes on every render
 * this way there's no need to wrap every component in withRouter() to let it catch history + change it
 *
 * Below some other solutions, but less convenient (also for v5):
 * https://github.com/remix-run/react-router/blob/main/FAQ.md#how-do-i-access-the-history-object-outside-of-components
 * https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
 */

let globalHistory: History | undefined;

const GlobalHistoryCatcher: FC<RouteComponentProps> = ({ history }) => {
  globalHistory = history;

  // show current history state
  // return <>{JSON.stringify(globalHistory.location)}</>;

  // eslint-disable-next-line unicorn/no-null
  return null;
};

const GlobalHistoryCatcherContainer = withRouter(GlobalHistoryCatcher);

function changeRoute(route: string) {
  if (globalHistory === undefined) {
    throw new Error(
      'No history Object. You probably forgot to mount GlobalHistoryCatcherContainer.',
    );
  }

  if (route !== globalHistory.location.pathname) {
    globalHistory.push(route);
  }
}

export { GlobalHistoryCatcherContainer, changeRoute };
