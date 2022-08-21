import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import { MemoryGamePlayingCard } from 'src/modules/memory-game/containers/MemoryGamePlayingCard';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { useMemoryGame } from 'src/modules/memory-game/hooks/useMemoryGame';
import { MovementResult } from 'src/modules/memory-game/models/MovementResult';
import { PlayingCard as PlayingCardModel } from 'src/modules/memory-game/models/PlayingCard';

type MemoryGameBoardProps = {
  className?: string;
  characterList: Character[];
};

export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className = '',
  characterList,
}) => {
  const {
    accuracy,
    clearedCardList,
    handleSelectCard,
    isGameOver,
    isValidatingSelection,
    movementResult,
    movesCount,
    playingCardList,
    selectedCardList,
  } = useMemoryGame(characterList);

  const handlePlayingCardClic = (playingCard: PlayingCardModel) => {
    handleSelectCard(playingCard);
    MemoryGameSelectCardEvent.trigger(playingCard);
  };

  React.useEffect(() => {
    MemoryGameMoveFinishedEvent.trigger({ movesCount, accuracy });
  }, [accuracy, movesCount]);

  React.useEffect(() => {
    isGameOver && MemoryGameGameOverEvent.trigger();
  }, [isGameOver]);

  return (
    <ul
      className={`grid w-full grid-cols-3 place-content-center gap-4 sm:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {playingCardList?.map((playingCard) => (
        <li key={playingCard.boardId} className="inline-flex w-full">
          <MemoryGamePlayingCard
            playingCardModel={playingCard}
            onClick={handlePlayingCardClic}
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
                ? 'border-ct-success-200 shadow-ct-success-400'
                : 'border-ct-error-200 shadow-ct-error-400'
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
