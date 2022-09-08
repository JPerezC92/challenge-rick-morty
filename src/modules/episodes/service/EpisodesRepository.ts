import { Episode } from 'src/modules/episodes/models/Episode';

export interface EpisodesRepository {
  getMany: (episodeIdList: number[]) => Promise<Episode[]>;
  filter: (props: { name?: string; episode?: string }) => Promise<Episode[]>;
}
