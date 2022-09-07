import { Episode } from 'src/modules/episodes/models/Episode';

export interface EpisodeView {
  id: Episode['id'];
  name: Episode['name'];
  code: Episode['episode'];
  created: Episode['created'];
  characterIdList: Episode['characterIdList'];
  airDate: Episode['airDate'];
  seasonId: Episode['airDate'];
}
