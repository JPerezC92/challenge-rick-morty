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
  gameOverEvent: MemoryGameGameOverEvent;
  moveFinishedEvent: MemoryGameMoveFinishedEvent;
  selectCardEvent: MemoryGameSelectCardEvent;
};

export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className = '',
  characterList,
  gameOverEvent,
  moveFinishedEvent,
  selectCardEvent,
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
  };

  React.useEffect(() => {
    if (!selectedCardList?.length) return;
    selectCardEvent.trigger(selectedCardList);
  }, [selectCardEvent, selectedCardList]);

  React.useEffect(() => {
    if (MovementResult.isMovementResult(movementResult)) return;
    moveFinishedEvent.trigger({ movesCount, accuracy });
  }, [accuracy, moveFinishedEvent, movementResult, movesCount]);

  React.useEffect(() => {
    if (!isGameOver) return;
    gameOverEvent.trigger();
  }, [gameOverEvent, isGameOver]);

  return (
    <ul
      className={`grid w-full grid-cols-3 place-content-center gap-4 sm:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {playingCardList?.map((playingCard) => (
        <li key={playingCard.boardId} className="inline-flex w-full">
          <MemoryGamePlayingCard
            data-testid={playingCard.id}
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
                ? 'border-ct-neutral-dark-700 shadow-ct-neutral-dark-700'
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
