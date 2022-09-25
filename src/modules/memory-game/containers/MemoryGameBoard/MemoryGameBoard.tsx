import { useRouter } from 'next/router';
import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import { MemoryGameDialog } from 'src/modules/memory-game/containers/MemoryGameDialog';
import { MemoryGamePlayingCard } from 'src/modules/memory-game/containers/MemoryGamePlayingCard';
import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameMoveIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameMoveIncreaseEvent';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { useMemoryGame } from 'src/modules/memory-game/hooks/useMemoryGame';
import { gameActions } from 'src/modules/memory-game/hooks/useMemoryGame/memoryGameReducer';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { MovementResult } from 'src/modules/memory-game/models/MovementResult';
import { PlayingCard as PlayingCardModel } from 'src/modules/memory-game/models/PlayingCard';
import { MemoryGameRoutes } from 'src/modules/memory-game/models/routes';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameBoardProps = {
  className?: string;
  characterList: Character[];
  gameOverEvent?: MemoryGameGameOverEvent;
  accuracyChangeEvent?: MemoryGameAccuracyChangeEvent;
  selectCardEvent?: MemoryGameSelectCardEvent;
  errorIncreaseEvent?: MemoryGameErrorIncreaseEvent;
  moveIncreaseEvent?: MemoryGameMoveIncreaseEvent;
  gameMode: `${GameModes}`;
};

export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className = '',
  characterList,
  errorIncreaseEvent,
  gameMode,
  gameOverEvent,
  accuracyChangeEvent,
  selectCardEvent,
}) => {
  const router = useRouter();
  const {
    errorCount,
    accuracy,
    clearedCardList,
    handleSelectCard,
    isGameOver,
    isWinner,
    isReadyToValidateSelection,
    movementResult,
    movesCount,
    playingCardList,
    selectedCardList,
    gameDispatch,
  } = useMemoryGame(characterList, { gameMode });

  const handlePlayingCardClic = (playingCard: PlayingCardModel) => {
    handleSelectCard(playingCard);
  };

  React.useEffect(() => {
    MemoryGameImperativeGameOverEvent.listener(() => {
      gameDispatch(gameActions.gameOverImperative());
    });
  }, [gameDispatch]);

  React.useEffect(() => {
    if (!selectedCardList?.length) return;
    selectCardEvent?.trigger(selectedCardList);
  }, [selectCardEvent, selectedCardList]);

  React.useEffect(() => {
    accuracyChangeEvent?.trigger(accuracy);
  }, [accuracy, accuracyChangeEvent]);

  React.useEffect(() => {
    MemoryGameMoveIncreaseEvent.trigger(movesCount);
  }, [movesCount]);

  React.useEffect(() => {
    errorIncreaseEvent?.trigger(errorCount);
  }, [errorCount, errorIncreaseEvent]);

  React.useEffect(() => {
    if (!isGameOver) return;
    gameOverEvent?.trigger();
  }, [gameOverEvent, isGameOver]);

  return (
    <>
      {(isGameOver || isWinner) && (
        <MemoryGameDialog
          cancelButtonText="Exit"
          confirmButtonText="Restart"
          onCancel={() => router.push(MemoryGameRoutes.rootPath)}
          onConfirm={() => MemoryGameRestartEvent.trigger()}
          open={isGameOver}
          title={isWinner ? 'You won' : 'Game Over'}
          content={
            <div>
              <ul>
                {[
                  { label: 'Moves', value: movesCount },
                  { label: 'Error', value: errorCount },
                  { label: 'Accuracy', value: accuracy },
                ].map((v) => (
                  <li key={v.label}>
                    <Text
                      l1
                      className="grid grid-cols-[30%_1fr] text-ct-special-ligth-100"
                      as="p"
                    >
                      <span>{v.label}:</span> <span>{v.value}</span>
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      )}

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
                isGameOver ||
                isWinner ||
                isReadyToValidateSelection ||
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
                isGameOver ||
                clearedCardList.includes(playingCard) ||
                selectedCardList.includes(playingCard)
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};
