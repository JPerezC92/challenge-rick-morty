import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Character } from 'src/modules/characters/models/Character';

export interface CharactersRepository {
  getCount: () => Promise<number>;
  getRamdomCharacterList(props: {
    count: number;
    limit?: number;
  }): Promise<Character[]>;
  getCharacterList(
    page?: number
  ): Promise<{ characterPreviewList: CharacterPreview[]; pages: number }>;
}
