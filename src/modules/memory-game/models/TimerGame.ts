import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface TimerGame extends Record<keyof BoardSize, number> {}

export const TimerGame: TimerGame = {
  12: 15,
  18: 25,
  24: 35,
};
