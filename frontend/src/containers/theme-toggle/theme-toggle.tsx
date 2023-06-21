import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, useColorMode } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/use-debounce';
import {
  initiateColorModeChangeUi,
  setColorModeToggleCoordsUi,
  uiScreenDetailsSelector,
} from '../../store';

type TThemeToggleContainer = {
  forceRecalcPosition?: unknown;
};

const ThemeToggleContainer: FC<TThemeToggleContainer> = ({ forceRecalcPosition }) => {
  const d = useAppDispatch();
  const refIcon = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();
  const themeToggleCb = useCallback(() => {
    void d(initiateColorModeChangeUi());
  }, [d]);
  const screenDetails = useAppSelector(uiScreenDetailsSelector);
  const updateIconsCoordsCb = useCallback(() => {
    if (refIcon.current !== null) {
      const { x, y } = refIcon.current.getBoundingClientRect();
      void d(setColorModeToggleCoordsUi({ x: x + 10, y: y + 10 }));
    }
  }, [d]);
  const [updateIconsCoordsDebounced] = useDebounce({ cb: updateIconsCoordsCb, delay: 350 });

  useEffect(() => {
    updateIconsCoordsDebounced();
  }, [d, screenDetails, updateIconsCoordsDebounced, forceRecalcPosition]);

  const themeSwitchProps = useMemo(
    () => ({
      boxSize: 5,
      cursor: 'pointer',
      onClick: themeToggleCb,
    }),
    [themeToggleCb],
  );

  return (
    <Flex
      position={'absolute'}
      top={6}
      right={3}
      zIndex={2}
      w={'25px'}
      h={'25px'}
      onClick={themeToggleCb}
      ref={refIcon}
    >
      {colorMode === 'light' ? (
        <MoonIcon {...themeSwitchProps} />
      ) : (
        <SunIcon {...themeSwitchProps} />
      )}
    </Flex>
  );
};

const ThemeToggleContainerMemo = memo(ThemeToggleContainer);

export { ThemeToggleContainerMemo };
