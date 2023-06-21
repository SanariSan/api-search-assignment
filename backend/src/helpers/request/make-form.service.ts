import FormData from 'form-data';

const makeForm = <T extends Record<string, unknown>>({ obj }: { readonly obj: T }) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    acc.append(key, val);
    return acc;
  }, new FormData());

export { makeForm };
