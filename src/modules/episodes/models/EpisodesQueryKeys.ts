export const EpisodesQueryKeys = {
  all: ['Episodes'] as const,
  episodePreviewList: () =>
    [...EpisodesQueryKeys.all, 'EpisodesPreviews'] as const,
} as const;
