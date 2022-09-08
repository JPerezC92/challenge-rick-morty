import { Character } from 'src/modules/characters/models/Character';

export interface CharactersRepository {
  getCount: () => Promise<number>;
  findManyById(props: {
    characterIdList: Character['id'][];
  }): Promise<Character[]>;
  paginatedCharacterList(
    page?: number
  ): Promise<{ characterList: Character[]; pages: number }>;
  findById: (id: string | number) => Promise<Character>;
}
