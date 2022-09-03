import { EpisodePreview } from 'src/modules/episodes/dto/EpisodePreview';
import { Episode } from 'src/modules/episodes/models/Episode';

export function EpisodeModelToPreview(
  episodeEndpoint: Episode
): EpisodePreview {
  return new EpisodePreview({
    ...episodeEndpoint,
  });
}
