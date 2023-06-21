import { Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef } from 'react';
import type { TEntities } from '../../store';

type TResultsComponent = {
  entities: TEntities;
};

const ResultsComponent: FC<TResultsComponent> = ({ entities }) => {
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      h={'100%'}
      p={5}
      alignItems={'center'}
      justifyContent={'flex-start'}
    >
      {entities.map((entity) => (
        <Flex w={'max-content'} h={'max-content'}>
          <Text>{JSON.stringify(entity, undefined, 2)}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

const ResultsComponentMemo = memo(ResultsComponent);

export { ResultsComponentMemo };
