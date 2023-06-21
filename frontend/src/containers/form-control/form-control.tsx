import { useFormikContext } from 'formik';
import type { FC } from 'react';
import { memo, useEffect } from 'react';

const FormControlContainer: FC<{
  isLoading: boolean;
  formValues?: Record<string, string>;
  forceResetForm?: boolean;
}> = ({ isLoading, formValues, forceResetForm }) => {
  const { resetForm, setSubmitting, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (isLoading) {
      resetForm();
      setSubmitting(false);
    }
  }, [isLoading, forceResetForm, resetForm, setSubmitting]);

  useEffect(() => {
    resetForm();
    setSubmitting(false);
  }, [forceResetForm, resetForm, setSubmitting]);

  useEffect(() => {
    if (formValues === undefined) return;

    Object.entries(formValues).forEach(([key, value]) => {
      void setFieldValue(key, value);
    });
  }, [formValues, setFieldValue]);

  return null;
};

export const FormControlContainerMemo = memo(FormControlContainer);
