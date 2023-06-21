import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { DELIM, SearchComponentMemo } from '../../components/search';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadingSearchEntitiesSelector, searchEntitiesAsync } from '../../store';
import { FormControlContainerMemo } from '../form-control';
import type { TSearchFormValues } from './search.const';
import { VALIDATION_SCHEMA } from './search.const';

type TSearchContainer = {
  [key: string]: unknown;
};

const SearchContainer: FC<TSearchContainer> = () => {
  const searchEntitiesLoadingState = useAppSelector(loadingSearchEntitiesSelector);
  const dispatch = useAppDispatch();

  const [formValues] = useState<TSearchFormValues>({
    email: 'jams@gmail.com',
    number: '',
  });

  const onSubmit = useCallback(
    (values: TSearchFormValues, actions: FormikHelpers<TSearchFormValues>) => {
      const { email, number } = values;
      const sanitizedNumber =
        number !== undefined && number.length > 0
          ? number.replace(new RegExp(`${DELIM}`, 'g'), '')
          : undefined;

      console.log(email, number, sanitizedNumber);
      void dispatch(searchEntitiesAsync({ email, number: sanitizedNumber }));
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
          <SearchComponentMemo
            isLoading={searchEntitiesLoadingState === 'loading'}
            {...formikConfig}
          />
          <FormControlContainerMemo isLoading={searchEntitiesLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

const SearchContainerMemo = memo(SearchContainer);

export { SearchContainerMemo };
