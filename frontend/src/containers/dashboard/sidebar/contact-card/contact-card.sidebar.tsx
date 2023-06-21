import type { FC } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { ContactCardComponentMemo } from '../../../../components/dashboard';

type TContactCardContainer = {
  [key: string]: unknown;
  isSelected: boolean;
  idx: number;
  onSelect: ({ contactIdx }: { contactIdx: number }) => void;
  title: string;
  lastMessage: { type: string | undefined; text: string };
};

const ContactCardContainer: FC<TContactCardContainer> = ({
  isSelected,
  idx,
  onSelect,
  title,
  lastMessage,
}) => {
  const onSelectCb = useCallback(() => {
    onSelect({ contactIdx: idx });
  }, [idx, onSelect]);

  const lastMessageFormatted = useMemo(() => {
    const { type } = lastMessage;
    if (type === undefined) return lastMessage.text;

    const from = type === 'outgoing' ? 'You:' : 'Them:';
    const text =
      lastMessage.text.length >= 28 ? `${lastMessage.text.slice(0, 28)}...` : lastMessage.text;

    return `${from} ${text}`;
  }, [lastMessage]);

  return (
    <ContactCardComponentMemo
      isSelected={isSelected}
      onSelect={onSelectCb}
      title={title}
      lastMessage={lastMessageFormatted}
    />
  );
};

const ContactCardContainerMemo = memo(ContactCardContainer);

export { ContactCardContainerMemo };
