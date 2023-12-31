import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { COLORS } from '../../chakra-setup';
import { ResultsContainerMemo } from '../results';
import { SearchContainerMemo } from '../search';
import type { TDashboardLayout } from './layout.dashboard.type';
import { ThemeToggleContainerMemo } from '../theme-toggle';

const DashboardLayoutContainer: FC<TDashboardLayout> = () => {
  const [bg, border] = [
    useColorModeValue(COLORS.whatsapp.bgLight, COLORS.whatsapp.bgDark),
    useColorModeValue(COLORS.whatsapp.activeLight, COLORS.whatsapp.activeDark),
  ];

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'minmax(375px, 2fr) minmax(225px, 1fr)'}
      templateColumns={{
        base: '1fr',
      }}
      templateAreas={`
      "search"
      "results"
      `}
      overflowY={'auto'}
    >
      <GridItem
        area={'search'}
        bg={bg}
        position={'relative'}
        overflowY={'auto'}
        overflowX={'hidden'}
        borderWidth={'2px'}
        borderStyle={'dashed'}
        borderColor={border}
        minW={'375px'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <ThemeToggleContainerMemo />
          <SearchContainerMemo />
        </Box>
      </GridItem>

      <GridItem area={'results'} bg={bg} position={'relative'} overflow={'hidden'} minW={'375px'}>
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <ResultsContainerMemo />
        </Box>
      </GridItem>
    </Grid>
  );
};

export { DashboardLayoutContainer };
