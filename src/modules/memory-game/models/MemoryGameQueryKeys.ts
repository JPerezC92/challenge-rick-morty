import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';

export const MemoryGameQueryKeys = {
  all: ['MemoryGame'] as const,
  configuration: () => [...MemoryGameQueryKeys.all, 'Configuration'] as const,
  roundsCount: () => [...MemoryGameQueryKeys.all, 'RoundsCount'] as const,
  characterList: (boardSize: BoardSize) =>
    [...MemoryGameQueryKeys.all, 'CharacterList', boardSize] as const,
} as const;
