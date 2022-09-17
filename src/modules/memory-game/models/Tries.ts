import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

export interface Tries extends Record<keyof BoardSize, number> {}

export const Tries: Tries = {
  12: 5,
  18: 10,
  24: 15,
};
