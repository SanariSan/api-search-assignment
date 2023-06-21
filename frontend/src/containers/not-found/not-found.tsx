import { Button, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { changeRoute } from '../functional';

type TNotFoundContainer = {
  [key: string]: unknown;
};

const NotFoundContainer: FC<TNotFoundContainer> = () => {
  const a = 1;

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={10}
      p={10}
    >
      <Text variant={'xxxxl'} fontWeight={'bold'} whiteSpace={'normal'}>
        Not found
      </Text>
      <Button
        onClick={() => {
          changeRoute('/');
        }}
      >
        Go home
      </Button>
    </Flex>
  );
};

const NotFoundContainerMemo = memo(NotFoundContainer);

export { NotFoundContainerMemo };
