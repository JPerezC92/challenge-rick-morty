export class EpisodePreview {
  readonly id: number;
  readonly name: string;
  readonly airDate: string;
  readonly episode: string;

  constructor(props: {
    id: number;
    name: string;
    airDate: string;
    episode: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.airDate = props.airDate;
    this.episode = props.episode;
  }
}
