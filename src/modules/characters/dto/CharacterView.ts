import { Status } from 'src/modules/characters/models/Status';

export interface CharacterView {
  id: number;
  image: string;
  name: string;
  status: Status;
  species: string;
  episodesIdList: number[];
  apparitionEpisodesCount: number;
  gender: string;
  type: string;
  originLocation: { id: number | null; name: string };
  actualLocation: { id: number | null; name: string };
}
