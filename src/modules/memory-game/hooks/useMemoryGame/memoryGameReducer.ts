import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import { Board } from 'src/modules/memory-game/models/Board';
import { Counter } from 'src/modules/memory-game/models/Counter';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { MovementResult } from 'src/modules/memory-game/models/MovementResult';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { ReturnTypesOfFunctionProps } from 'src/modules/shared/utils/ReturnTypesOfFunctionProps';

interface GameState {
  accuracy: Accuracy;
  clearedCardList: PlayingCard[];
  gameBoard: Board;
  isGameOver: boolean;
  isReadyToValidateSelection: boolean;
  areSelectedCardsEqual?: MovementResult;
  movesCount: Counter;
  errorCount: Counter;
  selectedCardList: PlayingCard[];
  gameMode: `${GameModes}`;
}

export const gameInitialState: GameState = {
  accuracy: Accuracy.init(),
  clearedCardList: [],
  gameBoard: Board.init([]),
  isGameOver: false,
  isReadyToValidateSelection: false,
  movesCount: Counter.init(),
  errorCount: Counter.init(),
  selectedCardList: [],
  gameMode: GameModes.NORMAL,
};

const enum GameActionType {
  SELECT_CARD = 'SELECT_CARD',
  GAME_OVER = 'GAME_OVER',
  CLEAR_SELECTED_CARD = 'CLEAR_SELECTED_CARD',
  VALIDATE_SELECTION = 'VALIDATE_SELECTION',
}

export const gameActions = {
  gameOverImperative: () => {
    return { type: GameActionType.GAME_OVER } as const;
  },
  selectCard: (playingCard: PlayingCard) => {
    return { type: GameActionType.SELECT_CARD, payload: playingCard } as const;
  },
  clearSelectedCard: () => {
    return { type: GameActionType.CLEAR_SELECTED_CARD } as const;
  },
  validateSelection: () => {
    return { type: GameActionType.VALIDATE_SELECTION } as const;
  },
};

type GameAction = ReturnTypesOfFunctionProps<typeof gameActions>;

export const memoryGameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case GameActionType.SELECT_CARD:
      const selectedCardList = [...state.selectedCardList, action.payload];
      const isReadyToValidateSelection =
        selectedCardList.length === Board.maxNumberSelectedCards;

      return {
        ...state,
        selectedCardList,
        isReadyToValidateSelection,
      };

    case GameActionType.VALIDATE_SELECTION:
      const areSelectedCardsEqual = Board.validateSelection(
        state.selectedCardList
      );
      const clearedCardList = areSelectedCardsEqual.value
        ? [...state.clearedCardList, ...state.selectedCardList]
        : [...state.clearedCardList];
      const movesCount = state.movesCount.increment();
      const errorCount = areSelectedCardsEqual.value
        ? state.errorCount
        : state.errorCount.increment();
      const accuracy = Accuracy.calculate({
        movesCount,
        clearedCardQuantity: clearedCardList.length,
      });

      const isGameOver = state.gameBoard.isGameOver(clearedCardList);

      return {
        ...state,
        accuracy,
        clearedCardList,
        errorCount,
        isGameOver,
        areSelectedCardsEqual,
        movesCount,
        // isReadyToValidateSelection: false,
      };

    case GameActionType.CLEAR_SELECTED_CARD:
      return {
        ...state,
        selectedCardList: [],
        isReadyToValidateSelection: false,
        areSelectedCardsEqual: undefined,
      };

    case GameActionType.GAME_OVER:
      return {
        ...state,
        isGameOver: true,
      };

    default:
      return { ...state };
  }
};
