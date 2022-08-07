import { Character } from 'src/modules/characters/models/Character';

export interface CharactersRepository {
  getCount: () => Promise<number | void>;
  getRamdomCharacterList(props: {
    count: number;
    limit?: number;
  }): Promise<Character[] | void>;
}
