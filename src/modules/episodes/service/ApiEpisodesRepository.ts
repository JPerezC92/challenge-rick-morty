import { EpisodeEndpointToModel } from 'src/modules/episodes/adapters/EpisodeEndpointToModel';
import { Episode } from 'src/modules/episodes/models/Episode';
import { EpisodesRepository } from 'src/modules/episodes/service/EpisodesRepository';
import { EpisodeListEndpointSchema } from 'src/modules/episodes/validators/EpisodeListEndpoint.schema';
import { EpisodePaginatedEndpointSchema } from 'src/modules/episodes/validators/EpisodePaginatedEndpoint.schema';
import { Repository } from 'src/modules/shared/service/Repository';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';

export const ApiEpisodesRepository: Repository<EpisodesRepository> = (
  signal
) => {
  const baseUrl = EnvironmentVariable.RICK_MORTY_BASE_URL + '/episode';

  return {
    getMany: async (episodeIdList): Promise<Episode[]> => {
      const response = await fetch(baseUrl + `/[${episodeIdList}]`, { signal });

      const result = await response.json();

      const validatedResult = EpisodeListEndpointSchema.parse(result);

      return validatedResult.map(EpisodeEndpointToModel);
    },

    async filter({ episode, name }) {
      const response = await fetch(
        baseUrl + `?episode=${episode || ''}&name=${name || ''}`
      );

      const result = await response.json();

      const validatedResult = EpisodePaginatedEndpointSchema.parse(result);

      return validatedResult.results.map(EpisodeEndpointToModel);
    },
  };
};
