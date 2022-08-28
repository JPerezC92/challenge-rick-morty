import { Status } from 'src/modules/characters/models/Status';

interface CharacterPreviewProps {
  apparitionEpisodes: number;
  id: number;
  img: string;
  name: string;
  status: Status;
  species: string;
}

export class CharacterPreview {
  readonly apparitionEpisodes: number;
  readonly id: number;
  readonly img: string;
  readonly name: string;
  readonly status: Status;
  readonly species: string;

  constructor(props: CharacterPreviewProps) {
    this.apparitionEpisodes = props.apparitionEpisodes;
    this.id = props.id;
    this.img = props.img;
    this.name = props.name;
    this.status = props.status;
    this.species = props.species;
  }
}
