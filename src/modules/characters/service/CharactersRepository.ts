import { Character } from 'src/modules/characters/models/Character';

export interface CharactersRepository {
  getCount: () => Promise<number>;
  getRamdomCharacterList(props: {
    count: number;
    limit?: number;
  }): Promise<Character[]>;
}
