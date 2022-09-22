import { Character } from 'src/modules/characters/models/Character';
import { CharactersListFilters } from 'src/modules/characters/models/CharactersListFilters';

export interface CharactersRepository {
  getCount: () => Promise<number>;
  findManyById(props: {
    characterIdList: Character['id'][];
  }): Promise<Character[]>;
  paginatedCharacterList(
    page?: number
  ): Promise<{ characterList: Character[]; pages: number }>;
  paginatedFilteredCharacterList(
    query: CharactersListFilters
  ): Promise<{ characterList: Character[]; pages: number }>;
  findById: (id: string | number) => Promise<Character>;
}
