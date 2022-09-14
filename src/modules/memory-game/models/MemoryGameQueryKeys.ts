export const MemoryGameQueryKeys = {
  all: ['MemoryGame'] as const,
  configuration: () => [...MemoryGameQueryKeys.all, 'Configuration'] as const,
  roundsCount: () => [...MemoryGameQueryKeys.all, 'RoundsCount'] as const,
  randomCharacterList: (size: number) =>
    [...MemoryGameQueryKeys.all, 'CharacterList', size] as const,
} as const;
