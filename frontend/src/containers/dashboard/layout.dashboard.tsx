import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { COLORS } from '../../chakra-setup';
import { ResultsContainerMemo } from '../results';
import { SearchContainerMemo } from '../search';
import type { TDashboardLayout } from './layout.dashboard.type';

const DashboardLayoutContainer: FC<TDashboardLayout> = () => {
  const [bg] = [useColorModeValue(COLORS.whatsapp.bgLight, COLORS.whatsapp.bgDark)];

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'2fr 1fr'}
      templateColumns={{
        base: '1fr',
      }}
      templateAreas={`
      "search"
      "results"
      `}
    >
      <GridItem
        area={'search'}
        bg={bg}
        position={'relative'}
        overflowY={'auto'}
        overflowX={'hidden'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <SearchContainerMemo />
        </Box>
      </GridItem>

      <GridItem
        area={'results'}
        bg={bg}
        position={'relative'}
        overflowY={'auto'}
        overflowX={'hidden'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <ResultsContainerMemo />
        </Box>
      </GridItem>
    </Grid>
  );
};

export { DashboardLayoutContainer };
