import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import { Board } from 'src/modules/memory-game/models/Board';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { isTest } from 'src/modules/shared/utils/nodeEnv';
import {
  gameActions,
  gameInitialState,
  memoryGameReducer,
} from './memoryGameReducer';

export const useMemoryGame = (
  characterList: Character[],
  config?: { gameMode: `${GameModes}` }
) => {
  const [gameState, gameDispatch] = React.useReducer(
    memoryGameReducer,
    gameInitialState,
    (s) => ({
      ...s,
      ...config,
      gameBoard: Board.init(characterList),
    })
  );

  const handleSelectCard = (playingCard: PlayingCard) => {
    gameDispatch(gameActions.selectCard(playingCard));
  };

  React.useEffect(() => {
    if (!gameState.isReadyToValidateSelection) {
      return;
    }

    gameDispatch(gameActions.validateSelection());

    const id = setTimeout(
      () => {
        gameDispatch(gameActions.clearSelectedCard());
        window.clearTimeout(id);
      },
      isTest() ? 0 : 1000
    );

    return () => {
      window.clearTimeout(id);
    };
  }, [gameState.isReadyToValidateSelection]);

  return {
    errorCount: gameState.errorCount.value,
    accuracy: gameState.accuracy.value,
    clearedCardList: gameState.clearedCardList,
    isGameOver: gameState.isGameOver,
    isReadyToValidateSelection: gameState.isReadyToValidateSelection,
    movementResult: gameState.areSelectedCardsEqual,
    movesCount: gameState.movesCount.value,
    playingCardList: gameState.gameBoard.playingCardList,
    selectedCardList: gameState.selectedCardList,
    handleSelectCard,
    gameDispatch,
  };
};
