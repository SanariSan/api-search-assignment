import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import { COLORS } from '../../../../chakra-setup';

type TChatMessageComponent = {
  [key: string]: unknown;
  type: string;
  textMessage: string;
  time: string;
};

const ChatMessageComponent: FC<TChatMessageComponent> = ({ type, textMessage, time }) => {
  const [outgoingMessageBg, incomingMessageBg, textColor, textColorAlt] = [
    useColorModeValue(COLORS.whatsapp.messageOutgoingLight, COLORS.whatsapp.messageOutgoingDark),
    useColorModeValue(COLORS.whatsapp.messageIncomingLight, COLORS.whatsapp.messageIncomingDark),
    useColorModeValue(COLORS.whatsapp.textColorLight, COLORS.whatsapp.textColorDark),
    useColorModeValue(COLORS.whatsapp.textColorAltLight, COLORS.whatsapp.textColorAltDark),
  ];

  return (
    <Flex
      w={'100%'}
      h={'max-content'}
      minH={'max-content'}
      minW={'275px'}
      alignItems={'center'}
      justifyContent={type === 'outgoing' ? 'flex-end' : 'flex-start'}
    >
      <Flex
        direction={'column'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        w={'max-content'}
        h={'max-content'}
        minW={'75px'}
        py={1}
        px={3}
        borderRadius={'10px'}
        bg={type === 'outgoing' ? outgoingMessageBg : incomingMessageBg}
      >
        <Flex w={'100%'} h={'max-content'} alignItems={'center'} justifyContent={'flex-start'}>
          <Text whiteSpace={'pre-wrap'} color={textColor} wordBreak={'break-word'}>
            {textMessage}
          </Text>
        </Flex>
        <Flex w={'100%'} h={'max-content'} alignItems={'center'} justifyContent={'flex-end'}>
          <Text variant={'xs'} color={textColorAlt}>
            {time}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const ChatMessageComponentMemo = memo(ChatMessageComponent);

export { ChatMessageComponentMemo };
