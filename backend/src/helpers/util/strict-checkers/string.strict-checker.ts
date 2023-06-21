function isValidString(value?: unknown) {
  if (typeof value === 'string' && value.length > 0) return true;
  return false;
}

export { isValidString };
