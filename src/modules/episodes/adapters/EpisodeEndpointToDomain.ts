import { EpisodeEndpoint } from 'src/modules/episodes/dto/EpisodeEndpoint';
import { Episode } from 'src/modules/episodes/models/Episode';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';
import { isDefinedListItems } from '../../shared/utils/isDefinedListItems';

export function EpisodeEndpointToDomain(
  episodeEndpoint: EpisodeEndpoint
): Episode {
  return new Episode({
    ...episodeEndpoint,
    airDate: episodeEndpoint.air_date,
    characterIdList: isDefinedListItems<number>(
      episodeEndpoint.characters.map(parseIdFromUrl)
    ),
  });
}
