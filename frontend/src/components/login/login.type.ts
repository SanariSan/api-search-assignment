import type { FormikProps } from 'formik';
import type { FormEventHandler } from 'react';
import type { TLoginFormValues } from '../../containers/login/login.const';

type TProps = FormikProps<TLoginFormValues>;

type TLogin = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  isLoading: boolean;
  onFillWithTemplate: () => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export type { TLogin };
