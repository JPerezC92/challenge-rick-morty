import { EpisodeView } from 'src/modules/episodes/dto/EpisodeView';
import { Episode } from 'src/modules/episodes/models/Episode';

export function EpisodeModelToView(episode: Episode): EpisodeView {
  return {
    airDate: episode.airDate,
    characterIdList: episode.characterIdList,
    code: episode.episode,
    created: episode.created,
    id: episode.id,
    name: episode.name,
    seasonId: episode.seasonId,
  };
}
