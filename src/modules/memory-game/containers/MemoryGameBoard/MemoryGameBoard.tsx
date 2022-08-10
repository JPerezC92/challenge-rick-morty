import React from 'react';
import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { Character } from 'src/modules/characters/models/Character';
import { Scores$Actions } from 'src/modules/memory-game/components/Scores$Actions';
import { useMemoryGame } from 'src/modules/memory-game/containers/MemoryGameBoard/useMemoryGame';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { Board } from 'src/modules/memory-game/models/Board';

type MemoryGameBoardProps = {
  className?: string;
  characterList: Character[];
};
export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className,
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
    <div className={className}>
      <MemoryGameSelectedCards
        selectedCards={selectedCardList}
        className="sticky top-0"
      />

      <div className="relative bg-ct-warning-400 px-2 py-3">
        {isGameOver && (
          <div className="absolute top-0 left-0 z-10 flex h-full w-full bg-slate-400/80">
            <p className="m-auto">You Won</p>
          </div>
        )}

        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
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

      <Scores$Actions className="sticky bottom-0" />
    </div>
  );
};
