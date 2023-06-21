function isArray(input: unknown): input is unknown[] {
  return typeof input === 'object' && input !== null && Array.isArray(input);
}

function isObject(input: unknown): input is Partial<Record<string, unknown>> {
  return typeof input === 'object' && !Array.isArray(input) && input !== null;
}

function isNotEmptyObject(input: unknown): input is { [key: string]: unknown } {
  return (
    typeof input === 'object' &&
    !Array.isArray(input) &&
    input !== null &&
    Object.keys(input).length > 0
  );
}

export { isArray, isObject, isNotEmptyObject };
