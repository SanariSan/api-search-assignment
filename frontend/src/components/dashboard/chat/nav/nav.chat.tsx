import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS } from '../../../../chakra-setup';

type TChatNavComponent = {
  [key: string]: unknown;
  isActive: boolean;
  onBack: () => void;
  title: string;
};

const ChatNavComponent: FC<TChatNavComponent> = ({ isActive, onBack, title }) => {
  const [titleColor] = [
    useColorModeValue(COLORS.whatsapp.textColorDark, COLORS.whatsapp.textColorDark),
  ];

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      p={3}
      gap={3}
      justifyContent={'flex-start'}
      alignItems={'center'}
      transition={'all 0.2s ease-in-out'}
      opacity={isActive ? 1 : 0}
      transform={isActive ? 'translate(0px, 0px)' : 'translate(-100px, 0px)'}
    >
      <Button size={'sm'} borderRadius={'20px'} onClick={onBack}>
        {'<'}
      </Button>
      <Text variant={'lg'} color={titleColor}>
        {title}
      </Text>
    </Flex>
  );
};

const ChatNavComponentMemo = memo(ChatNavComponent);

export { ChatNavComponentMemo };
