interface EpisodeProps {
  id: number;
  name: string;
  airDate: string;
  episode: string;
  characterIdList: number[];
  created: string;
}

export class Episode {
  readonly id: number;
  readonly name: string;
  readonly airDate: string;
  readonly episode: string;
  readonly characterIdList: number[];
  readonly created: string;
  readonly seasonId: string;

  constructor(props: EpisodeProps) {
    this.id = props.id;
    this.name = props.name;
    this.airDate = props.airDate;
    this.episode = props.episode;
    this.characterIdList = props.characterIdList;
    this.created = props.created;
    this.seasonId = props.episode.slice(0, 3).toLocaleLowerCase().trim();
  }
}
