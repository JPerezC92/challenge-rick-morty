import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface Timer extends Record<keyof BoardSize, number> {}

export const Timer: Timer = {
  12: 25,
  18: 35,
  24: 45,
};
