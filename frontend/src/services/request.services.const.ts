const DEFAULT_FETCH_HEADERS: HeadersInit = {
  // Connection: 'keep-alive',
  'Cache-Control': 'no-cache, no-store, no-transform',
  'Content-Type': 'application/json',
};

const DEFAULT_FETCH_OPTIONS: RequestInit = {
  method: 'GET',
  redirect: 'manual',
  credentials: 'include',
};

export { DEFAULT_FETCH_HEADERS, DEFAULT_FETCH_OPTIONS };
