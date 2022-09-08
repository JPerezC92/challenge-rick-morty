import { EpisodeEndpoint } from 'src/modules/episodes/dto/EpisodeEndpoint';
import { Episode } from 'src/modules/episodes/models/Episode';
import { isDefinedListItems } from 'src/modules/shared/utils/isDefinedListItems';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';

export function EpisodeEndpointToModel(
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
