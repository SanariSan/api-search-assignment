import path from 'path';

const constructApiUrl = (base: string) => (apiVersion: string) => (urlPath: string) =>
  new URL(path.join(`api`, `${apiVersion}`, `${urlPath}`), base)[
    process.env.REACT_APP_NODE_ENV === 'production' ? 'href' : 'pathname'
  ];

const getApiUrl = constructApiUrl(process.env.REACT_APP_API_URL)(process.env.REACT_APP_API_VERSION);

const STATIC_ROUTES = {
  ENTITY: '/search/entity',
  SESSION_INIT: '/access/session-init',
};

const ROUTES = {
  SEARCH: {
    ENTITY: getApiUrl(STATIC_ROUTES.ENTITY),
  },
  ACCESS: {
    SESSION_INIT: getApiUrl(STATIC_ROUTES.SESSION_INIT),
  },
};

export { STATIC_ROUTES, ROUTES };
