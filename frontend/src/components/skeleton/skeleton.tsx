import { Skeleton, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useMemo, memo } from 'react';
import { COLORS } from '../../chakra-setup';

export type TSkeleton = {
  isLoading: boolean;
  width?: string;
  height?: string;
} & Parameters<typeof Skeleton>[0];

const SkeletonPlaceholderComponent: FC<TSkeleton> = ({ isLoading, width, height, ...rest }) => {
  const [startColor, endColor] = [
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  const sizePreset = useMemo(
    () =>
      width !== undefined || height !== undefined
        ? {}
        : {
            minW: { base: '230px', sm: '330px' },
            maxW: { base: '230px', sm: '450px' },
            minH: { base: '350px', sm: '475px' },
            w: '100%',
            height: { base: '350px', sm: '435px' },
            borderRadius: '20px',
          },
    [width, height],
  );

  return (
    <Skeleton
      opacity={isLoading ? 1 : 0}
      startColor={startColor}
      endColor={endColor}
      {...sizePreset}
      width={width}
      height={height}
      {...rest}
      transition={'opacity 1s linear'}
    />
  );
};

const SkeletonPlaceholderComponentMemo = memo(SkeletonPlaceholderComponent);

export { SkeletonPlaceholderComponent, SkeletonPlaceholderComponentMemo };
