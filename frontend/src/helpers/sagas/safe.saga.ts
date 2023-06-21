export function* safe<T>(effect: T) {
  try {
    return { response: (yield effect) as T };
  } catch (error) {
    return { error: error as Error };
  }
}
