export class EpisodePreview {
  readonly id: number;
  readonly name: string;
  readonly airDate: string;
  readonly code: string;
  readonly seasonId: string;

  constructor(props: {
    id: number;
    name: string;
    airDate: string;
    episode: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.airDate = props.airDate;
    this.code = props.episode;
    this.seasonId = props.episode.slice(0, 3).toLocaleLowerCase().trim();
  }
}
