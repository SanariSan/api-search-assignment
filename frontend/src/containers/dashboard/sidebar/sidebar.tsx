import { Flex } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import type { TContacts } from '../../../store';
import {
  contactsSelector,
  setSelectedContactIdxUi,
  uiSelectedContactIdxSelector,
} from '../../../store';
import { ContactCardContainerMemo } from './contact-card';
import { SidebarSearchContainerMemo } from './search';
import { formatPhoneNumber } from '../../../helpers/util';

interface ISidebarContainer {
  [key: string]: unknown;
  sidebarToggleCb: (payload?: { isOpened: boolean }) => void;
}

const SidebarContainer: FC<ISidebarContainer> = ({ sidebarToggleCb }) => {
  const d = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);
  const selectedContactIdx = useAppSelector(uiSelectedContactIdxSelector);

  const lastMessages = useMemo(
    () =>
      contacts.map(({ chatHistory }) => {
        if (
          chatHistory.length > 0 &&
          chatHistory.at(0)?.textMessage !== undefined &&
          chatHistory.at(0)?.type !== undefined
        ) {
          type THistoryEntity = TContacts[number]['chatHistory'][number];
          const historyEntity = chatHistory.at(0) as THistoryEntity;
          return { type: historyEntity.type, text: historyEntity.textMessage };
        }

        return {
          type: undefined,
          text: 'Write something!',
        };
      }),
    [contacts],
  );

  const onSelectContactCb = useCallback(
    ({ contactIdx }: { contactIdx: number }) => {
      void d(setSelectedContactIdxUi({ contactIdx }));
      sidebarToggleCb({ isOpened: false });
      return;
    },
    [d, sidebarToggleCb],
  );

  return (
    <Flex
      direction={'column'}
      alignItems={'flex-start'}
      gap={0}
      w={'100%'}
      h={'100%'}
      minW={'275px'}
    >
      <Flex w={'100%'} h={'75px'} alignItems={'center'} justifyContent={'center'}>
        <SidebarSearchContainerMemo />
      </Flex>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        overflowY={'auto'}
      >
        {contacts.map((el, idx) => (
          <ContactCardContainerMemo
            key={`${el.wid}-${idx}`}
            idx={idx}
            isSelected={selectedContactIdx === idx}
            onSelect={onSelectContactCb}
            title={formatPhoneNumber(el.wid)}
            lastMessage={lastMessages[idx]}
          />
        ))}
      </Flex>
    </Flex>
  );
};

const SidebarContainerMemo = memo(SidebarContainer);

export { SidebarContainerMemo };
