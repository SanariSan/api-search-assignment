import type { FC } from 'react';
import { memo } from 'react';
import { ResultsComponentMemo } from '../../components/results';
import { useAppSelector } from '../../hooks/redux';
import { entitiesSelector } from '../../store';

type TResultsContainer = {
  [key: string]: unknown;
};

const ResultsContainer: FC<TResultsContainer> = () => {
  const entities = useAppSelector(entitiesSelector);

  return <ResultsComponentMemo entities={entities} />;
};

const ResultsContainerMemo = memo(ResultsContainer);

export { ResultsContainerMemo };
