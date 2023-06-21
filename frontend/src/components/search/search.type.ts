import type { FormEventHandler } from 'react';
import type { FormikProps } from 'formik';
import type { TSearchFormValues } from '../../containers/search';

type TProps = FormikProps<TSearchFormValues>;
type TSearchComponent = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  isLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  description: string;
  onChangeVersion: () => void;
};

export type { TSearchComponent };
