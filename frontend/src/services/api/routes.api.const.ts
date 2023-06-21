import path from 'path';

const constructApiUrl = (base: string) => (apiVersion: string) => (urlPath: string) =>
  new URL(path.join(`api`, `${apiVersion}`, `${urlPath}`), base)[
    process.env.REACT_APP_NODE_ENV === 'production' ? 'href' : 'pathname'
  ];

const getApiUrl = constructApiUrl(process.env.REACT_APP_API_URL)(process.env.REACT_APP_API_VERSION);

const STATIC_ROUTES = {
  LOGIN: '/search/entity',
  LOGOUT: '/search/entity_v2',
};

const ROUTES = {
  SEARCH: {
    ENTITY: getApiUrl(STATIC_ROUTES.LOGIN),
    ENTITY_V2: getApiUrl(STATIC_ROUTES.LOGOUT),
  },
};

export { STATIC_ROUTES, ROUTES };
