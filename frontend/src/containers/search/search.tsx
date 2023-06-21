import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { DELIM, SearchComponentMemo } from '../../components/search';
import { useAppDispatch } from '../../hooks/redux';
import { searchEntitiesAsync, searchEntitiesV2Async } from '../../store';
import { FormControlContainerMemo } from '../form-control';
import type { TSearchFormValues } from './search.const';
import { VALIDATION_SCHEMA } from './search.const';

type TSearchContainer = {
  [key: string]: unknown;
};

const SearchContainer: FC<TSearchContainer> = () => {
  // const searchEntitiesLoadingState = useAppSelector(loadingSearchEntitiesSelector);
  const dispatch = useAppDispatch();
  const [currentVersion, setCurrentVersion] = useState<'v1' | 'v2'>('v1');

  const [formValues] = useState<TSearchFormValues>({
    email: '',
    number: '',
  });

  const changeVersionCb = useCallback(() => {
    setCurrentVersion((s) => (s === 'v1' ? 'v2' : 'v1'));
  }, []);

  const submitCb = useCallback(
    (values: TSearchFormValues, actions: FormikHelpers<TSearchFormValues>) => {
      const { email, number } = values;
      const sanitizedNumber =
        number !== undefined && number.length > 0
          ? number.replace(new RegExp(`${DELIM}`, 'g'), '')
          : undefined;

      const payload = { email, number: sanitizedNumber };
      void dispatch(
        currentVersion === 'v1' ? searchEntitiesAsync(payload) : searchEntitiesV2Async(payload),
      );
    },
    [dispatch, currentVersion],
  );

  return (
    <Formik
      initialValues={formValues}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={submitCb}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(formikConfig) => (
        <>
          <SearchComponentMemo
            isLoading={false}
            title={currentVersion === 'v1' ? 'Entities search (v1)' : 'Entities search (v2)'}
            description={
              currentVersion === 'v1'
                ? 'This version implies server-side abort on resend'
                : 'This version implies client-side debounce with saga'
            }
            onChangeVersion={changeVersionCb}
            {...formikConfig}
          />
          <FormControlContainerMemo isLoading={false} />
        </>
      )}
    </Formik>
  );
};

const SearchContainerMemo = memo(SearchContainer);

export { SearchContainerMemo };
