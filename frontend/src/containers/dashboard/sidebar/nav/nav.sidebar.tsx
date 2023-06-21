import type { FC } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { Flex } from '@chakra-ui/react';
import { SidebarNavComponentMemo } from '../../../../components/dashboard';
import { ThemeToggleContainerMemo } from '../../../theme-toggle';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { logoutUserAsync, uiSidebarStateSelector, userInfoSelector } from '../../../../store';
import { formatPhoneNumber } from '../../../../helpers/util';

type TSidebarNavContainer = {
  [key: string]: unknown;
};

const SidebarNavContainer: FC<TSidebarNavContainer> = () => {
  const d = useAppDispatch();
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const { wid } = useAppSelector(userInfoSelector);
  const phone = useMemo(() => formatPhoneNumber(wid), [wid]);

  const logoutCb = useCallback(() => {
    void d(logoutUserAsync());
  }, [d]);

  return (
    <Flex
      w={'100%'}
      minW={'275px'}
      h={'100%'}
      p={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      position={'relative'}
    >
      <ThemeToggleContainerMemo forceRecalcPosition={isSidebarOpened} />
      <SidebarNavComponentMemo title={phone} onLogout={logoutCb} />
    </Flex>
  );
};

const SidebarNavContainerMemo = memo(SidebarNavContainer);

export { SidebarNavContainerMemo };
