import type { UseToastOptions } from '@chakra-ui/react';
import { useColorMode, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

export const useReactiveToast = ({
  type,
  title,
  description,
  storeCleanupCb,
}: {
  type: Exclude<UseToastOptions['status'], 'loading' | undefined>;
  title?: string;
  description?: string;
  storeCleanupCb?: () => void;
}) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    if (description === undefined) return;

    toast({
      title,
      description,
      status: type,
      duration: 5000,
      position: 'top-right',
      variant: colorMode === 'light' ? 'subtle' : 'solid',
      isClosable: true,
    });

    if (storeCleanupCb === undefined) return;
    storeCleanupCb();
  }, [title, description, type, toast, colorMode, storeCleanupCb]);
};
