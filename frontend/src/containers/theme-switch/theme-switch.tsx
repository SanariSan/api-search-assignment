import type { FC, MutableRefObject } from 'react';
import { memo } from 'react';
import { FancyThemeSwitchContainerMemo } from './fancy.theme-switch';

type TThemeSwitchContainer = {
  screenshotTargetRef: MutableRefObject<HTMLElement | null>;
};

const ThemeSwitchContainer: FC<TThemeSwitchContainer> = ({ screenshotTargetRef }) => (
  // const isMobile = useAppSelector(uiIsMobileSelector);

  // if (isMobile) return <LightThemeSwitchContainerMemo />;
  <FancyThemeSwitchContainerMemo screenshotTargetRef={screenshotTargetRef} />
);
const ThemeSwitchContainerMemo = memo(ThemeSwitchContainer);

export { ThemeSwitchContainerMemo };
