import { EpisodeView } from 'src/modules/episodes/dto/EpisodeView';
import { Episode } from 'src/modules/episodes/models/Episode';

export function EpisodeModelToView(episodeEndpoint: Episode): EpisodeView {
  return {
    airDate: episodeEndpoint.airDate,
    characterIdList: episodeEndpoint.characterIdList,
    code: episodeEndpoint.episode,
    created: episodeEndpoint.created,
    id: episodeEndpoint.id,
    name: episodeEndpoint.name,
    seasonId: episodeEndpoint.episode.slice(0, 3).toLocaleLowerCase().trim(),
  };
}
