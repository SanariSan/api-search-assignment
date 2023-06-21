import { Avatar, Circle, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { FaDoorOpen } from 'react-icons/fa';
import { COLORS } from '../../../../chakra-setup';

type TSidebarNavComponent = {
  [key: string]: unknown;
  title: string;
  onLogout: () => void;
};

const SidebarNavComponent: FC<TSidebarNavComponent> = ({ title, onLogout }) => {
  const [dimmer, icon, textColor] = [
    useColorModeValue(COLORS.black[900], COLORS.black[900]),
    useColorModeValue(COLORS.white[900], COLORS.white[900]),
    useColorModeValue(COLORS.whatsapp.textColorLight, COLORS.whatsapp.textColorDark),
  ];

  return (
    <>
      <Flex alignItems={'center'} justifyContent={'center'} pl={2} gap={3}>
        <Circle
          size={12}
          cursor={'pointer'}
          borderRadius={'999999px'}
          position={'relative'}
          onClick={onLogout}
        >
          <Circle
            size={12}
            bg={dimmer}
            opacity={0}
            borderRadius={'999999px'}
            position={'absolute'}
            zIndex={1}
            transition={'opacity 0.1s ease-in-out'}
            _hover={{
              opacity: 0.6,
            }}
          >
            <Icon as={FaDoorOpen} boxSize={{ base: 5 }} color={icon} />
          </Circle>
          <Avatar objectFit={'contain'} borderRadius={'999999px'} boxSize={12} animation={'none'} />
        </Circle>
        <Text variant={{ base: 'sm', sm: 'md', md: 'lg' }} color={textColor}>
          {title}
        </Text>
      </Flex>
    </>
  );
};

const SidebarNavComponentMemo = memo(SidebarNavComponent);

export { SidebarNavComponentMemo };
