import { GameModes } from 'src/modules/memory-game/models/GameModes';

export interface ConfigurationStoreRepository {
  loadConfiguration: (boardSize: number) => void;
  changeBoardSize: (boardSize: number) => void;
  changeGameMode: (boardSize: `${GameModes}`) => void;
}
