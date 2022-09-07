import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Character } from 'src/modules/characters/models/Character';

export interface CharactersRepository {
  getCount: () => Promise<number>;
  getMany(props: { characterIdList: Character['id'][] }): Promise<Character[]>;
  getCharacterList(
    page?: number
  ): Promise<{ characterPreviewList: CharacterPreview[]; pages: number }>;
  findById: (id: string | number) => Promise<Character>;
}
