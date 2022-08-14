import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { Board } from 'src/modules/memory-game/models/Board';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import {
  gameActions,
  gameInitialState,
  memoryGameReducer,
} from './memoryGameReducer';

export function useMemoryGame(characterList: Character[]) {
  const [gameState, gameDispatch] = React.useReducer(
    memoryGameReducer,
    gameInitialState,
    (s) => ({ ...s, gameBoard: Board.init(characterList) })
  );

  const handleClicPlayingCard = (playingCard: PlayingCard) => {
    gameDispatch(gameActions.selectCard(playingCard));
    MemoryGameSelectCardEvent.trigger(playingCard);
  };

  React.useEffect(() => {
    // if (gameState.isGameOver) {
    //   const id = setTimeout(() => {
    //     MemoryGameGameOverEvent.trigger();
    //     clearTimeout(id);
    //   }, 2000);
    //   return;
    // }

    if (!gameState.isValidatingSelection) {
      return;
    }

    gameDispatch(gameActions.validateSelection());

    const id = setTimeout(() => {
      gameDispatch(gameActions.clearSelectedCard());
      window.clearTimeout(id);
    }, 1000);

    return () => window.clearTimeout(id);
  }, [gameState.isValidatingSelection]);

  return {
    isValidatingSelection: gameState.isValidatingSelection,
    movementResult: gameState.movementResult,
    clearedCardList: gameState.clearedCardList,
    accuracy: gameState.accuracy.value,
    isGameOver: gameState.isGameOver,
    movesCount: gameState.movesCount.value,
    playingCardList: gameState.gameBoard.playingCardList,
    selectedCardList: gameState.selectedCardList,
    handleClicPlayingCard,
  };
}
