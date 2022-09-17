import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { GameModes } from 'src/modules/memory-game/models/GameModes';

export interface ConfigurationStoreRepository {
  loadConfiguration: (props: {
    boardSize: BoardSize[keyof BoardSize];
    gameMode: `${GameModes}`;
  }) => void;
  changeBoardSize: (boardSize: BoardSize[keyof BoardSize]) => void;
  changeGameMode: (boardSize: `${GameModes}`) => void;
}
