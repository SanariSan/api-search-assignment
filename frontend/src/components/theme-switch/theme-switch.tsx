import type { FC } from 'react';
import { memo } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { uiColorModeChangeStatusSelector } from '../../store';

type TFancyThemeSwitchComponent = {
  isVisible: boolean;
  bg: string | undefined;
  colorModeChangeStatus: ReturnType<typeof uiColorModeChangeStatusSelector>;
  colorModeChangeStatusProxy: ReturnType<typeof uiColorModeChangeStatusSelector>;
  animation: string;
};

const FancyThemeSwitchComponent: FC<TFancyThemeSwitchComponent> = ({
  colorModeChangeStatus,
  colorModeChangeStatusProxy,
  bg,
  isVisible,
  animation,
}) => (
  <>
    {(colorModeChangeStatus === 'ongoing' || colorModeChangeStatusProxy === 'ongoing') && (
      // overlay Box will stay until animation is fully done
      // prevents user from interrupting anything
      <Box
        position={'absolute'}
        zIndex={999_999}
        w={'100%'}
        h={'100%'}
        left={0}
        top={0}
        background={'transparent'}
      />
    )}
    {isVisible && (
      <Image
        as={motion.img}
        position={'absolute'}
        zIndex={999_999}
        w={'100%'}
        h={'100%'}
        backgroundImage={bg}
        left={0}
        top={0}
        transform={'perspective(600px) translateX(0px) translateY(0px) translateZ(1px)'}
        opacity={0}
        animation={animation}
      />
    )}
  </>
);

export const FancyThemeSwitchComponentMemo = memo(FancyThemeSwitchComponent);
