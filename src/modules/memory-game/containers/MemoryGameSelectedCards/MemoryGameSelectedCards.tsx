import React from 'react';
import { TbPlayCard } from 'react-icons/tb';
import { useSelectedCardListStore } from 'src/modules/memory-game/hooks/useSelectedCardListStore';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { Icon } from 'src/modules/shared/components/Icon';
import { Text } from 'src/modules/shared/components/Text';

export const CardSelected: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text
      l1
      as="div"
      className="inline-flex items-center justify-center gap-x-1 truncate text-ct-primary-300"
    >
      <Icon
        Icon={TbPlayCard}
        className={` ${!!children ? 'visible' : 'invisible'}`}
      />

      <p className="truncate" role="paragraph">
        {children}
      </p>
    </Text>
  );
};

type MemoryGameSelectedCardsProps = {
  className?: string;
};

export const MemoryGameSelectedCards: React.FC<
  MemoryGameSelectedCardsProps
> = ({ className = '' }) => {
  const { selectedCardList, selectedCardStore } = useSelectedCardListStore();

  React.useEffect(() => {
    const cleanup = MemoryGameSelectCardEvent.listener((p) => {
      selectedCardStore.add(p);
    });

    return () => cleanup();
  }, [selectedCardStore]);

  return (
    <header
      className={`z-10 grid grid-cols-[1fr_1fr] divide-x-2 divide-ct-error-300 border border-ct-error-200 bg-gradient-to-r from-ct-secondary-700/90 via-ct-error-800/90 to-ct-secondary-700/90 p-2 shadow-sm shadow-ct-error-500 sm:p-3 md:rounded-b-2xl ${className}`}
    >
      <CardSelected>{selectedCardList?.[0]?.name}</CardSelected>
      <CardSelected>{selectedCardList?.[1]?.name}</CardSelected>
    </header>
  );
};
