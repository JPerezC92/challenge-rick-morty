import React from 'react';
import { TbPlayCard } from 'react-icons/tb';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

type MemoryGameSelectedCardsProps = {
  className?: string;
  selectedCards: PlayingCard[];
};

export const MemoryGameSelectedCards: React.FC<
  MemoryGameSelectedCardsProps
> = ({ className, selectedCards }) => {
  // const canValidateMatch = Board.canValidateMatch(selectedCards);
  // const isMatch = selectedCards[0]?.id === selectedCards[1]?.id;

  return (
    <header
      className={`z-10 grid min-h-fit  grid-cols-[1fr_auto_1fr] bg-red-300 py-1 ${className}`}
    >
      <h3 className="flex place-content-center place-items-center">
        <i
          className={`inline-flex text-2xl ${
            !!selectedCards[0] ? 'visible' : 'invisible'
          }`}
        >
          <TbPlayCard className="inline-block " />
        </i>
        <span>{selectedCards[0]?.name}</span>
      </h3>

      <span> -- </span>

      <h3 className="flex place-content-center place-items-center">
        <i
          className={`inline-flex text-2xl ${
            !!selectedCards[1] ? 'visible' : 'invisible'
          }`}
        >
          <TbPlayCard className="inline-flex" />
        </i>
        <span>{selectedCards[1]?.name}</span>
      </h3>
    </header>
  );
};
