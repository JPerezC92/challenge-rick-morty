import React from 'react';
import { TbPlayCard } from 'react-icons/tb';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameSelectedCardsProps = {
  className?: string;
  selectedCards: PlayingCard[];
};

export const MemoryGameSelectedCards: React.FC<
  MemoryGameSelectedCardsProps
> = ({ className, selectedCards }) => {
  return (
    <header
      className={`ct-neutral-medium-600 z-10 grid min-h-fit grid-cols-[1fr_auto_1fr] rounded-b bg-gradient-to-r from-ct-neutral-dark-800 via-ct-neutral-medium-600 to-ct-neutral-dark-800 p-2 backdrop-blur-sm ${className}`}
    >
      <Text
        as="span"
        className="flex place-content-center place-items-center text-ct-primary-400"
      >
        <i
          className={`inline-flex text-2xl ${
            !!selectedCards[0] ? 'visible' : 'invisible'
          }`}
        >
          <TbPlayCard className="inline-block " />
        </i>
        <>{selectedCards[0]?.name}</>
      </Text>

      <Text as="span" className="text-ct-error-100">
        |
      </Text>

      <Text
        as="span"
        className="flex place-content-center place-items-center text-ct-primary-300"
      >
        <i
          className={`inline-flex text-2xl ${
            !!selectedCards[1] ? 'visible' : 'invisible'
          }`}
        >
          <TbPlayCard className="inline-flex" />
        </i>
        <>{selectedCards[1]?.name}</>
      </Text>
    </header>
  );
};
