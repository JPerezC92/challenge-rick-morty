import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface ConfigurationState {
  boardSize: BoardSize[keyof BoardSize];
  gameMode: `${GameModes}`;
  isLoaded: boolean;
}
