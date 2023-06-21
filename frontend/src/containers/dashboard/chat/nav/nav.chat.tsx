import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ChatNavComponentMemo } from '../../../../components/dashboard';
import { formatPhoneNumber } from '../../../../helpers/util';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { contactsSelectedContactInfo, setSelectedContactIdxUi } from '../../../../store';

type TChatNavContainer = {
  [key: string]: unknown;
  sidebarToggleCb: (payload?: { isOpened: boolean }) => void;
};

const ChatNavContainer: FC<TChatNavContainer> = ({ sidebarToggleCb }) => {
  const d = useAppDispatch();
  const selectedContactInfo = useAppSelector(contactsSelectedContactInfo);
  const [lastSelectedContactInfo, setLastSelectedContactInfo] = useState(selectedContactInfo);

  const onBackCb = useCallback(() => {
    sidebarToggleCb({ isOpened: true });
    void d(setSelectedContactIdxUi({ contactIdx: -1 }));
  }, [d, sidebarToggleCb]);

  useEffect(() => {
    if (selectedContactInfo === undefined) return;

    setLastSelectedContactInfo(selectedContactInfo);
  }, [selectedContactInfo]);

  const title = useMemo(
    () => formatPhoneNumber(lastSelectedContactInfo?.wid),
    [lastSelectedContactInfo],
  );

  return (
    <ChatNavComponentMemo
      isActive={selectedContactInfo !== undefined}
      onBack={onBackCb}
      title={title}
    />
  );
};

const ChatNavContainerMemo = memo(ChatNavContainer);

export { ChatNavContainerMemo };
