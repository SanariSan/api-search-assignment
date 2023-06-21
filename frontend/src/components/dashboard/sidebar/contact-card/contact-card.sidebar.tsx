import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS } from '../../../../chakra-setup';

type TContactCardComponent = {
  [key: string]: unknown;
  isSelected: boolean;
  onSelect: () => void;
  title: string;
  lastMessage: string;
};

const ContactCardComponent: FC<TContactCardComponent> = ({
  isSelected,
  onSelect,
  title,
  lastMessage,
}) => {
  const [active, navBg, textColor, textColorAlt] = [
    useColorModeValue(COLORS.whatsapp.activeLight, COLORS.whatsapp.activeDark),
    useColorModeValue(COLORS.whatsapp.textColorAltLight, COLORS.whatsapp.navBgDark),
    useColorModeValue(COLORS.whatsapp.textColorLight, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.textColorAltLight, COLORS.whatsapp.textColorAltDark),
  ];

  return (
    <Flex
      w={'100%'}
      h={'72px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={isSelected ? active : 'transparent'}
      cursor={'pointer'}
      onClick={onSelect}
      gap={3}
    >
      <Flex alignItems={'center'} justifyContent={'center'} pl={3}>
        <Avatar objectFit={'contain'} borderRadius={'999999px'} boxSize={12} animation={'none'} />
      </Flex>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        p={3}
        borderBottom={`1px solid ${navBg}`}
      >
        <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
          <Text variant={'lg'} color={textColor}>
            {title}
          </Text>
        </Flex>
        <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
          <Text color={textColorAlt}>{lastMessage}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ContactCardComponentMemo = memo(ContactCardComponent);

export { ContactCardComponentMemo };
