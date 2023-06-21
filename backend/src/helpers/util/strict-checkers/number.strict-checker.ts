function isValidNumber(value?: unknown) {
  if (typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)) return true;
  return false;
}

export { isValidNumber };
