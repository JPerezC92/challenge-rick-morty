import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import { Board } from 'src/modules/memory-game/models/Board';
import { MovementResult } from 'src/modules/memory-game/models/MovementResult';
import { Moves } from 'src/modules/memory-game/models/Moves';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { ReturnTypesOfFunctionProps } from 'src/modules/shared/utils/ReturnTypesOfFunctionProps';

interface GameState {
  accuracy: Accuracy;
  clearedCardList: PlayingCard[];
  gameBoard: Board;
  isGameOver: boolean;
  isValidatingSelection: boolean;
  movementResult?: MovementResult;
  movesCount: Moves;
  selectedCardList: PlayingCard[];
}
export const gameInitialState: GameState = {
  accuracy: Accuracy.init(),
  clearedCardList: [],
  gameBoard: Board.init([]),
  isGameOver: false,
  isValidatingSelection: false,
  movesCount: Moves.init(),
  selectedCardList: [],
};

const enum GameActionType {
  SELECT_CARD = 'SELECT_CARD',
  CLEAR_SELECTED_CARD = 'CLEAR_SELECTED_CARD',
  VALIDATE_SELECTION = 'VALIDATE_SELECTION',
}

export const gameActions = {
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
      const isValidatingSelection =
        selectedCardList.length === Board.maxNumberSelectedCards;

      return {
        ...state,
        selectedCardList,
        isValidatingSelection,
      };

    case GameActionType.VALIDATE_SELECTION:
      const movementResult = Board.validateSelection(state.selectedCardList);
      const clearedCardList = movementResult.value
        ? [...state.clearedCardList, ...state.selectedCardList]
        : [...state.clearedCardList];
      const movesCount = state.movesCount.increment();
      const isGameOver = state.gameBoard.isGameOver(clearedCardList);
      const accuracy = state.accuracy.calculate({
        movesCount,
        clearedCardQuantity: clearedCardList.length,
      });

      return {
        ...state,
        isGameOver,
        clearedCardList,
        movementResult,
        accuracy,
        movesCount,
      };

    case GameActionType.CLEAR_SELECTED_CARD:
      return {
        ...state,
        selectedCardList: [],
        isValidatingSelection: false,
        movementResult: undefined,
      };

    default:
      return { ...state };
  }
};
