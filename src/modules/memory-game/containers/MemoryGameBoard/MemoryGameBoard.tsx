import React from 'react';
import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { Character } from 'src/modules/characters/models/Character';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { useMemoryGame } from 'src/modules/memory-game/hooks/useMemoryGame';
import { MovementResult } from 'src/modules/memory-game/models/MovementResult';

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
    movementResult,
    isValidatingSelection,
    movesCount,
    accuracy,
    playingCardList,
    selectedCardList,
    clearedCardList,
  } = useMemoryGame(characterList);

  React.useEffect(() => {
    MemoryGameMoveFinishedEvent.trigger({ movesCount, accuracy });
  }, [accuracy, movesCount]);

  return (
    <ul
      className={`grid w-full grid-cols-3 place-content-center gap-4 sm:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {playingCardList?.map((playingCard) => (
        <li key={playingCard.boardId} className="inline-flex w-full">
          <CharacterCard
            playingCard={playingCard}
            onClick={handleClicPlayingCard}
            disabled={
              isValidatingSelection ||
              selectedCardList.includes(playingCard) ||
              clearedCardList.includes(playingCard)
            }
            className={`${
              !MovementResult.isMovementResult(movementResult) ||
              !selectedCardList.includes(playingCard)
                ? ''
                : movementResult.value
                ? 'border-ct-success-200 shadow-ct-success-500'
                : 'border-ct-error-200 shadow-ct-error-500'
            }`}
            isFlip={
              clearedCardList.includes(playingCard) ||
              selectedCardList.includes(playingCard)
            }
          />
        </li>
      ))}
    </ul>
  );
};
