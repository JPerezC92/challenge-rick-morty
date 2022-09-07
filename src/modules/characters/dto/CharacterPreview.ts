import { Status } from 'src/modules/characters/models/Status';

export interface CharacterPreview {
  apparitionEpisodes: number;
  id: number;
  image: string;
  name: string;
  status: Status;
  species: string;
}
