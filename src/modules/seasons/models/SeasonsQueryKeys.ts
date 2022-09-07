export const SeasonsQueryKeys = {
  all: ['SEASONS'] as const,
  episodesList: (seasonId: string) =>
    [...SeasonsQueryKeys.all, seasonId] as const,
};
