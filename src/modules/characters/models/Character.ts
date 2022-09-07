import { Status } from 'src/modules/characters/models/Status';

export class Location {
  readonly id: number | undefined;
  readonly name: string;

  constructor(props: { name: string; id: number | undefined }) {
    this.id = props.id;
    this.name = props.name;
  }
}

interface CharacterProps {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: Status;
  type: string;
  originLocation: Location;
  actualLocation: Location;
  episodesIdList: number[];
}

export class Character {
  readonly id: number;
  readonly name: string;
  readonly image: string;
  readonly gender: string;
  readonly species: string;
  readonly status: Status;
  readonly type: string;
  readonly originLocation: Location;
  readonly actualLocation: Location;
  readonly episodesIdList: number[];

  constructor(props: CharacterProps) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.gender = props.gender;
    this.species = props.species;
    this.status = props.status;
    this.type = props.type;
    this.originLocation = props.originLocation;
    this.actualLocation = props.actualLocation;
    this.episodesIdList = props.episodesIdList;
  }
}
