import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface Attempts extends Record<keyof BoardSize, number> {}

export const Attempts: Attempts = {
  12: 6,
  18: 9,
  24: 12,
};
