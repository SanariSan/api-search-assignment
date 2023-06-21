import { Box, Flex, keyframes, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useEffect, useMemo, useRef } from 'react';
import { COLORS } from '../../../chakra-setup';
import { ChatMessageComponentMemo } from '../../../components/dashboard';
import { useAppSelector } from '../../../hooks/redux';
import {
  contactsSelectedContactChatHistorySelector,
  uiColorModeChangeStatusSelector,
} from '../../../store';
import { ChatboxContainerMemo } from './chatbox';

const animationKeyframes = keyframes`
      0% { opacity: 0; }
      100% { opacity: 1; }
  `;

const animation = `${animationKeyframes} 0.3s ease-in-out forwards`;

type TChatContainer = {
  [key: string]: unknown;
};

const ChatContainer: FC<TChatContainer> = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const chatHistory = useAppSelector(contactsSelectedContactChatHistorySelector);
  const [navBg] = [useColorModeValue(COLORS.whatsapp.navBgLight, COLORS.whatsapp.navBgDark)];
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);

  useEffect(() => {
    if (lastMessageRef.current !== null) {
      lastMessageRef.current.scrollIntoView({ block: 'end' });
    }
  }, [chatHistory, colorModeChangeStatus]);

  const chatHistoryMemo = useMemo(
    () =>
      chatHistory.map((el, idx) => {
        const { type, textMessage, timestamp } = el;
        const date = new Date(timestamp * 1000);
        const time = `${String(date.getHours()).padStart(2, '0')}:${String(
          date.getMinutes(),
        ).padStart(2, '0')}`;

        return (
          <ChatMessageComponentMemo
            key={`${type}-${idx}`}
            type={type}
            textMessage={textMessage}
            time={time}
          />
        );
      }),
    [chatHistory],
  );

  return (
    <Flex w={'100%'} h={'100%'} direction={'column'}>
      <Flex w={'100%'} h={'calc(100% - 75px)'} direction={'column'} gap={5}>
        {colorModeChangeStatus !== 'ongoing' && (
          <Flex
            w={'100%'}
            h={'100%'}
            direction={'column'}
            gap={5}
            p={5}
            overflowY={'auto'}
            opacity={0}
            animation={animation}
          >
            {chatHistoryMemo}
            <Box ref={lastMessageRef} />
          </Flex>
        )}
      </Flex>
      <Flex w={'100%'} h={'75px'} bg={navBg}>
        <ChatboxContainerMemo />
      </Flex>
    </Flex>
  );
};

const ChatContainerMemo = memo(ChatContainer);

export { ChatContainerMemo };
