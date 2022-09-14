import { GameModes } from 'src/modules/memory-game/models/GameModes';

export interface ConfigurationState {
  boardSize: number;
  gameMode: `${GameModes}`;
  isLoaded: boolean;
}
