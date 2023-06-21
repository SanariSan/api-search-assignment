import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkUserAuthStatusAsync, loadingUserAuthSelector } from '../../store';
import { FormControlContainerMemo } from '../form-control';
import type { TLoginFormValues } from './login.const';
import { VALIDATION_SCHEMA } from './login.const';

const LoginContainer: FC = () => {
  const userAuthLoadingState = useAppSelector(loadingUserAuthSelector);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<TLoginFormValues>({
    idInstance: '',
    apiTokenInstance: '',
  });

  const fillWithTemplateCb = useCallback(() => {
    setFormValues({
      idInstance: process.env.REACT_APP_ID_INSTANCE,
      apiTokenInstance: process.env.REACT_APP_API_TOKEN_INSTANCE,
    });
  }, []);

  const onSubmit = useCallback(
    (values: TLoginFormValues, actions: FormikHelpers<TLoginFormValues>) => {
      void dispatch(
        checkUserAuthStatusAsync({
          idInstance: values.idInstance,
          apiTokenInstance: values.apiTokenInstance,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={formValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(formikConfig) => (
        <>
          <LoginComponent
            isLoading={userAuthLoadingState === 'loading'}
            onFillWithTemplate={fillWithTemplateCb}
            {...formikConfig}
          />
          <FormControlContainerMemo
            isLoading={userAuthLoadingState === 'loading'}
            formValues={formValues}
          />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };
