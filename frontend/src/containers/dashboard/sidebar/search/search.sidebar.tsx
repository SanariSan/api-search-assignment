import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { SidebarSearchComponentMemo } from '../../../../components/dashboard';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { contactsSelector, pushContact } from '../../../../store';
import { FormControlContainerMemo } from '../../../form-control';
import type { TSidebarSearchFormValues } from './search.sidebar.const';
import { SIDEBAR_SEARCH_VALIDATION_SCHEMA } from './search.sidebar.const';

type TSidebarSearchContainer = {
  [key: string]: unknown;
};
const SidebarSearchContainer: FC<TSidebarSearchContainer> = () => {
  const d = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);
  const [forceResetForm, setForceResetForm] = useState(false);

  const [formValues] = useState<TSidebarSearchFormValues>({
    contact: '',
  });

  const onSubmit = useCallback(
    (values: TSidebarSearchFormValues, actions: FormikHelpers<TSidebarSearchFormValues>) => {
      const { contact } = values;
      if (contact === undefined) return;

      // just extract phone since already validated
      const phoneRegexp = new RegExp('^\\+?(?<phone>\\d+)$');
      const match = phoneRegexp.exec(contact)?.groups?.phone;

      // not possible because of yup validation, but for type safety and consistency here it is
      if (match === undefined) return;

      const wid = `${match}@c.us`;
      const widsSet = new Set(contacts.map((c) => c.wid));
      if (widsSet.has(wid)) return;

      setForceResetForm((s) => !s);
      void d(
        pushContact({
          contact: { wid },
        }),
      );
    },
    [d, contacts],
  );

  return (
    <Formik
      initialValues={formValues}
      validationSchema={SIDEBAR_SEARCH_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {(formikConfig) => (
        <>
          <SidebarSearchComponentMemo {...formikConfig} />
          <FormControlContainerMemo isLoading={false} forceResetForm={forceResetForm} />
        </>
      )}
    </Formik>
  );
};

const SidebarSearchContainerMemo = memo(SidebarSearchContainer);

export { SidebarSearchContainerMemo };
