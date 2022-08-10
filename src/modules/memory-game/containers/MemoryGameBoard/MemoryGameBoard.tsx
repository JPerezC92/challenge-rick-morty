import React from 'react';
import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { Character } from 'src/modules/characters/models/Character';
import { Scores$Actions } from 'src/modules/memory-game/components/Scores$Actions';
import { useMemoryGame } from 'src/modules/memory-game/containers/MemoryGameBoard/useMemoryGame';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { Board } from 'src/modules/memory-game/models/Board';
import { ScrollArea } from 'src/modules/shared/components/ScrollArea';

type MemoryGameBoardProps = {
  className?: string;
  characterList: Character[];
};

export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className = '',
  characterList,
}) => {
  const {
    handleClicPlayingCard,
    isGameOver,
    playingCardList,
    selectedCardList,
    clearedCardIdList,
  } = useMemoryGame(characterList);

  return (
    <div
      className={`grid max-h-[inherit] min-h-[inherit] grid-rows-[auto_1fr_auto] ${className}`}
    >
      <MemoryGameSelectedCards selectedCards={selectedCardList} />

      <ScrollArea className="relative">
        <div className="bg-ct-warning-400 px-2 py-3">
          <div
            className={`absolute top-0 left-0 z-10 flex h-full w-full bg-slate-400/80 ${
              isGameOver ? 'visible' : 'invisible'
            }`}
          >
            <p className="m-auto">You Won</p>
          </div>

          <ul className="grid max-h-full grid-cols-3 gap-4 sm:grid-cols-4">
            {playingCardList?.map((playingCard) => (
              <li key={playingCard.boardId}>
                <CharacterCard
                  playingCard={playingCard}
                  onClick={handleClicPlayingCard}
                  disabled={
                    Board.canValidateMatch(selectedCardList) ||
                    selectedCardList.includes(playingCard) ||
                    clearedCardIdList.includes(playingCard.id)
                  }
                  flip={
                    clearedCardIdList.includes(playingCard.id) ||
                    selectedCardList.includes(playingCard)
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>

      <Scores$Actions />
    </div>
  );
};
