import { Character } from 'src/modules/characters/models/Character';

export class PlayingCard implements Character {
  boardId: string;
  id: number;
  name: string;
  image: string;

  constructor(props: {
    id: number;
    name: string;
    image: string;
    boardId: string;
  }) {
    this.boardId = props.boardId;
    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
  }
}
