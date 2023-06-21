import { useColorMode } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { finalizeColorModeChangeUi, uiColorModeChangeStatusSelector } from '../../store';

type TLightThemeSwitchContainer = {
  [key: string]: unknown;
};

const LightThemeSwitchContainer: FC<TLightThemeSwitchContainer> = () => {
  const mountRenderCompleted = useRef(false);
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const { toggleColorMode } = useColorMode();
  const d = useAppDispatch();

  useEffect(() => {
    if (colorModeChangeStatus === 'ongoing') {
      toggleColorMode();
      void d(finalizeColorModeChangeUi());
    }
  }, [colorModeChangeStatus, toggleColorMode, d]);

  useEffect(() => {
    if (!mountRenderCompleted.current) mountRenderCompleted.current = true;

    return () => {
      mountRenderCompleted.current = false;
    };
  }, []);

  return <></>;
};

const LightThemeSwitchContainerMemo = memo(LightThemeSwitchContainer);

export { LightThemeSwitchContainerMemo };
