export const MemoryGameQueryKeys = {
  all: ['MemoryGame'] as const,
  configuration: () => [...MemoryGameQueryKeys.all, 'Configuration'] as const,
  roundsCount: () => [...MemoryGameQueryKeys.all, 'RoundsCount'] as const,
} as const;
