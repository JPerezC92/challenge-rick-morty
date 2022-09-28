import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface Timer extends Record<keyof BoardSize, number> {}

export const Timer: Timer = {
  12: 30,
  18: 40,
  24: 50,
};
