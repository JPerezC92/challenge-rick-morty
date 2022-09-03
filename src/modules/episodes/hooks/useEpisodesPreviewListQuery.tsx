import { useQuery } from '@tanstack/react-query';
import { EpisodeModelToPreview } from 'src/modules/episodes/adapters/EpisodeEndpointToPreview';
import { EpisodesQueryKeys } from 'src/modules/episodes/models/EpisodesQueryKeys';
import { ApiEpisodesRepository } from 'src/modules/episodes/service/EpisodesRepository';

export function useEpisodesPreviewListQuery(episodeIdList: number[]) {
  return useQuery(
    EpisodesQueryKeys.episodePreviewList(),
    async ({ signal }) => {
      const episodesRepository = ApiEpisodesRepository(signal);

      const episodeList = await episodesRepository.getMany(episodeIdList);

      return episodeList.map(EpisodeModelToPreview);
    }
  );
}
