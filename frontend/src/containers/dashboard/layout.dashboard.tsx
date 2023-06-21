import { Box, Grid, GridItem, useColorMode, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback } from 'react';
import bgImg from '../../../assets/chat_bg.png';
import { COLORS } from '../../chakra-setup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  contactsSelectedContactInfo,
  setIsSidebarOpenedUi,
  uiSidebarStateSelector,
} from '../../store';
import { ChatContainerMemo, ChatNavContainerMemo } from './chat';
import type { TDashboardLayout } from './layout.dashboard.type';
import { SidebarContainerMemo, SidebarNavContainerMemo } from './sidebar';

const DashboardLayoutContainer: FC<TDashboardLayout> = () => {
  const d = useAppDispatch();
  const { colorMode } = useColorMode();
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const selectedContactInfo = useAppSelector(contactsSelectedContactInfo);

  const [bg, navBg, border] = [
    useColorModeValue(COLORS.whatsapp.bgLight, COLORS.whatsapp.bgDark),
    useColorModeValue(COLORS.whatsapp.navBgLight, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorAltLight, COLORS.whatsapp.navBgDark),
  ];

  const sidebarToggleCb = useCallback(
    (payload?: { isOpened: boolean }) => {
      void d(setIsSidebarOpenedUi({ isOpened: payload?.isOpened ?? 'toggle' }));
    },
    [d],
  );

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'70px 1fr'}
      templateColumns={{
        base: isSidebarOpened ? '100% 0px' : '0px 100%',
        md: '400px 1fr',
      }}
      templateAreas={`
      "sidenav mainnav"
      "side main"
      `}
      transition={'0.3s ease-in-out'}
    >
      <GridItem
        area={'sidenav'}
        bg={navBg}
        boxShadow={'0px 0px 20px -5px rgba(0,0,0,0.3)'}
        zIndex={1}
        borderStyle={'solid'}
        borderColor={'transparent'}
        borderLeft={'none'}
        borderTop={'none'}
        borderBottom={'none'}
        borderWidth={'1px'}
        overflow={'hidden'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <SidebarNavContainerMemo />
        </Box>
      </GridItem>

      <GridItem
        area={'side'}
        bg={bg}
        zIndex={1}
        borderStyle={'solid'}
        borderColor={border}
        borderLeft={'none'}
        borderTop={'none'}
        borderBottom={'none'}
        borderWidth={'1px'}
        overflow={'hidden'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <SidebarContainerMemo sidebarToggleCb={sidebarToggleCb} />
        </Box>
      </GridItem>

      <GridItem
        area={'mainnav'}
        bg={navBg}
        boxShadow={'0px 0px 20px -5px rgba(0,0,0,0.3)'}
        zIndex={1}
        overflow={'hidden'}
      >
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          <ChatNavContainerMemo sidebarToggleCb={sidebarToggleCb} />
        </Box>
      </GridItem>

      <GridItem area={'main'} bg={bg} position={'relative'} overflowY={'auto'} overflowX={'hidden'}>
        <Box
          backgroundImage={bgImg}
          position={'absolute'}
          top={0}
          left={0}
          opacity={0.06}
          filter={'auto'}
          invert={colorMode === 'dark' ? 0 : 1}
          backgroundRepeat={'repeat'}
          width={'100%'}
          height={'100%'}
        />
        <Box overflow={'hidden'} position={'relative'} w={'100%'} h={'100%'}>
          {selectedContactInfo !== undefined && <ChatContainerMemo />}
        </Box>
      </GridItem>
    </Grid>
  );
};

export { DashboardLayoutContainer };
