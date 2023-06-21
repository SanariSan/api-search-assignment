const DEFAULT_HEADERS = {
  Accept: '*',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
}; // , "Content-Type": "application/json" };
const LIB_SPECIFIC_OPTIONS = {
  timeout: 15_000,
};

export { DEFAULT_HEADERS, LIB_SPECIFIC_OPTIONS };
