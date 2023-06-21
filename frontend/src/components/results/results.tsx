import { Flex, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import type { TEntities } from '../../store';
import { COLORS } from '../../chakra-setup';

type TResultsComponent = {
  entities: TEntities;
};

const ResultsComponent: FC<TResultsComponent> = ({ entities }) => {
  const [bg, textColor, border] = [
    useColorModeValue(COLORS.whatsapp.navBgDark, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorLight, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.activeLight, COLORS.whatsapp.activeDark),
  ];

  return (
    <SimpleGrid
      minChildWidth={'200px'}
      spacingX="10px"
      spacingY={'20px'}
      w={'100%'}
      h={'100%'}
      p={5}
      gap={3}
      overflowY={'auto'}
      gridTemplateColumns={'repeat(auto-fill, minmax(200px, 1fr))'}
    >
      {entities.map((entity) => (
        <Flex
          direction={'column'}
          w={'max-content'}
          h={'max-content'}
          minH={'75px'}
          borderRadius={'20px'}
          borderWidth={'2px'}
          borderColor={border}
          borderStyle={'dashed'}
          bg={bg}
          alignItems={'center'}
          justifyContent={'center'}
          p={3}
          gap={3}
        >
          <Text color={textColor}>Email: {entity?.email}</Text>
          <Text color={textColor}>Number: {entity?.number}</Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

const ResultsComponentMemo = memo(ResultsComponent);

export { ResultsComponentMemo };
