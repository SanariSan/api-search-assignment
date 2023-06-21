import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { ChatboxComponentMemo } from '../../../../components/dashboard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { loadingSendMessageSelector, sendMessageAsync } from '../../../../store';
import { FormControlContainerMemo } from '../../../form-control';
import type { TChatboxFormValues } from './chatbox.chat.const';
import { CHATBOX_VALIDATION_SCHEMA } from './chatbox.chat.const';

type TChatboxContainer = {
  [key: string]: unknown;
};

const ChatboxContainer: FC<TChatboxContainer> = () => {
  const d = useAppDispatch();
  const sendMessageLoadingStatus = useAppSelector(loadingSendMessageSelector);
  const isLoading = sendMessageLoadingStatus === 'loading';

  const [formValues] = useState<TChatboxFormValues>({
    message: '',
  });

  const onSubmit = useCallback(
    (values: TChatboxFormValues, actions: FormikHelpers<TChatboxFormValues>) => {
      const { message } = values;
      if (message === undefined || message.length <= 0) return;

      void d(sendMessageAsync({ message }));
    },
    [d],
  );

  return (
    <Formik
      initialValues={formValues}
      validationSchema={CHATBOX_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {(formikConfig) => (
        <>
          <ChatboxComponentMemo isLoading={isLoading} {...formikConfig} />
          <FormControlContainerMemo isLoading={isLoading} />
        </>
      )}
    </Formik>
  );
};

const ChatboxContainerMemo = memo(ChatboxContainer);

export { ChatboxContainerMemo };
