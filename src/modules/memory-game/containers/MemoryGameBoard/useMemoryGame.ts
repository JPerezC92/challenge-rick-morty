import React from 'react';
import { Character } from 'src/modules/characters/models/Character';
import * as MemoryGameGameOverEvent from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { Board } from 'src/modules/memory-game/models/Board';
import { Moves } from 'src/modules/memory-game/models/Moves';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

interface GameState {
  gameBoard: Board;
  selectedCardList: PlayingCard[];
  clearedCardIdList: PlayingCard['id'][];
  isGameOver: boolean;
  movesCount: Moves;
}

const gameInitialState: GameState = {
  gameBoard: Board.init([]),
  selectedCardList: [],
  clearedCardIdList: [],
  isGameOver: false,
  movesCount: Moves.init(),
};

const enum GameActionType {
  SELECT_CARD = 'SELECT_CARD',
  CLEAR_SELECTED_CARD = 'CLEAR_SELECTED_CARD',
  IS_MATCH = 'IS_MATCH',
  IS_MISSMATCH = 'IS_MISSMATCH',
  GAME_OVER = 'GAME_OVER',
}

export const gameActions = {
  selectCard: (playingCard: PlayingCard) => {
    console.log('selectCard');
    return { type: GameActionType.SELECT_CARD, payload: playingCard } as const;
  },
  clearSelectedCard: () => {
    return { type: GameActionType.CLEAR_SELECTED_CARD } as const;
  },
  missmatch: () => ({ type: GameActionType.IS_MISSMATCH } as const),
  match: (playingCardId: PlayingCard['id']) =>
    ({ type: GameActionType.IS_MATCH, payload: playingCardId } as const),
};

type ReturnTypesOfFunctionProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
}[keyof T];

type GameAction = ReturnTypesOfFunctionProps<typeof gameActions>;

export function useMemoryGame(characterList: Character[]) {
  const [gameState, gameDispatch] = React.useReducer(
    (state: GameState, action: GameAction): GameState => {
      switch (action.type) {
        case GameActionType.SELECT_CARD:
          return {
            ...state,
            selectedCardList: [...state.selectedCardList, action.payload],
          };

        case GameActionType.CLEAR_SELECTED_CARD:
          return { ...state, selectedCardList: [] };

        case GameActionType.IS_MATCH: {
          const clearedCardIdList = [
            ...state.clearedCardIdList,
            action.payload,
          ];
          return {
            ...state,
            movesCount: state.movesCount.increment(),
            selectedCardList: [],
            clearedCardIdList: clearedCardIdList,
            isGameOver: state.gameBoard.isGameOver(clearedCardIdList),
          };
        }

        case GameActionType.IS_MISSMATCH:
          return {
            ...state,
            movesCount: state.movesCount.increment(),
            selectedCardList: [],
          };

        default:
          return { ...state };
      }
    },
    gameInitialState,
    (s) => ({ ...s, gameBoard: Board.init(characterList) })
  );

  const handleClicPlayingCard = (playingCard: PlayingCard) => {
    gameDispatch(gameActions.selectCard(playingCard));
  };

  React.useEffect(() => {
    if (gameState.isGameOver) {
      const id = setTimeout(() => {
        MemoryGameGameOverEvent.Trigger();
        clearTimeout(id);
      }, 2000);
      return;
    }

    if (!Board.canValidateMatch(gameState.selectedCardList)) {
      return;
    }

    if (Board.isMatch(gameState.selectedCardList)) {
      const id = setTimeout(() => {
        const [playingCard] = gameState.selectedCardList;
        gameDispatch(gameActions.match(playingCard.id));
        clearTimeout(id);
      }, 1000);
      return;
    }

    const id = setTimeout(() => {
      gameDispatch(gameActions.missmatch());
      clearTimeout(id);
    }, 1000);
  }, [gameState.isGameOver, gameState.selectedCardList]);

  return {
    clearedCardIdList: gameState.clearedCardIdList,
    handleClicPlayingCard,
    isGameOver: gameState.isGameOver,
    movesCount: gameState.movesCount.value,
    playingCardList: gameState.gameBoard.playingCardList,
    selectedCardList: gameState.selectedCardList,
  };
}
