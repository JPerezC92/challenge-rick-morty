import { EpisodesGetManyEndpointSchema } from 'src/modules/episodes/dto/EpisodesGetManyEndpoint';
import { Episode } from 'src/modules/episodes/models/Episode';
import { Repository } from 'src/modules/shared/service/Repository';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';
import { EpisodeEndpointToDomain } from '../adapters/EpisodeEndpointToDomain';

export interface EpisodesRepository {
  getMany: (episodeIdList: number[]) => Promise<Episode[]>;
}

export const ApiEpisodesRepository: Repository<EpisodesRepository> = (
  signal
) => {
  const baseUrl = EnvironmentVariable.RICK_MORTY_BASE_URL + '/episode';

  return {
    getMany: async (episodeIdList): Promise<Episode[]> => {
      const response = await fetch(baseUrl + `/[${episodeIdList}]`, { signal });

      const result = await response.json();

      const validatedResult = EpisodesGetManyEndpointSchema.parse(result);

      return validatedResult.map(EpisodeEndpointToDomain);
    },
  };
};
