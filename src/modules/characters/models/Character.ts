export class Character {
  readonly id: number;
  readonly name: string;
  readonly image: string;

  constructor(props: { id: number; name: string; image: string }) {
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
  }
}
