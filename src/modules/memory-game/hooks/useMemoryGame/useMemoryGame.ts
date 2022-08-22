import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import { Board } from 'src/modules/memory-game/models/Board';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import {
  gameActions,
  gameInitialState,
  memoryGameReducer,
} from './memoryGameReducer';

export const useMemoryGame = (characterList: Character[]) => {
  const [gameState, gameDispatch] = React.useReducer(
    memoryGameReducer,
    gameInitialState,
    (s) => ({ ...s, gameBoard: Board.init(characterList) })
  );

  const handleSelectCard = (playingCard: PlayingCard) => {
    gameDispatch(gameActions.selectCard(playingCard));
  };

  React.useEffect(() => {
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
    accuracy: gameState.accuracy.value,
    clearedCardList: gameState.clearedCardList,
    isGameOver: gameState.isGameOver,
    isValidatingSelection: gameState.isValidatingSelection,
    movementResult: gameState.movementResult,
    movesCount: gameState.movesCount.value,
    playingCardList: gameState.gameBoard.playingCardList,
    selectedCardList: gameState.selectedCardList,
    handleSelectCard,
  };
};
