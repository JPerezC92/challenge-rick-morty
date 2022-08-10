import React from 'react';
import { TbPlayCard } from 'react-icons/tb';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { Text } from 'src/modules/shared/components/Text';

export const CardSelected: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Text
      as="span"
      className="flex place-content-center place-items-center text-ct-primary-300"
      l1
    >
      <i
        className={`inline-flex text-2xl sm:text-4xl ${
          !!children ? 'visible' : 'invisible'
        }`}
      >
        <TbPlayCard className="inline-flex" />
      </i>
      <>{children}</>
    </Text>
  );
};

type MemoryGameSelectedCardsProps = {
  className?: string;
  selectedCards: PlayingCard[];
};

export const MemoryGameSelectedCards: React.FC<
  MemoryGameSelectedCardsProps
> = ({ className, selectedCards }) => {
  return (
    <header
      className={`z-10 grid grid-cols-[1fr_1fr] divide-x-2 divide-ct-error-300 border border-ct-error-200 bg-gradient-to-r from-ct-secondary-700/90 via-ct-error-800/90 to-ct-secondary-700/90 p-2 shadow-sm shadow-ct-error-500 sm:p-4 md:rounded-b-2xl ${className}`}
    >
      <CardSelected>{selectedCards[0]?.name}</CardSelected>
      <CardSelected>{selectedCards[1]?.name}</CardSelected>
    </header>
  );
};
