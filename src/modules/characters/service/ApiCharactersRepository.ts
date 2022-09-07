import { CharacterEndpointToDomain } from 'src/modules/characters/adapters/CharacterEndpointToDomain';
import { CharacterEndpointToPreview } from 'src/modules/characters/adapters/CharacterEndpointToPreview';
import { CharacterEndpointSchema } from 'src/modules/characters/dto/CharacterEndpoint';
import {
  CharacterGetEndpoint,
  CharacterGetEndpointSchema,
} from 'src/modules/characters/dto/CharacterGetEndpoint';
import { CharacterListGetEndpointSchema } from 'src/modules/characters/dto/CharacterListGetEndpoint';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Character } from 'src/modules/characters/models/Character';
import { CharactersRepository } from 'src/modules/characters/service/CharactersRepository';
import { Repository } from 'src/modules/shared/service/Repository';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';
import { randomUniqueIntArray } from 'src/modules/shared/utils/randomUniqueIntArray';

export const ApiCharactersRepository: Repository<CharactersRepository> = (
  signal
) => {
  const baseUrl = EnvironmentVariable.RICK_MORTY_BASE_URL + '/character';

  return {
    getCount: async () => {
      const response = await fetch(baseUrl, { signal });

      const result = (await response.json()) as CharacterGetEndpoint | void;

      const validatedResult = CharacterGetEndpointSchema.parse(result);

      return validatedResult.info.count;
    },

    getMany: async ({ characterIdList }): Promise<Character[]> => {
      const response = await fetch(baseUrl + `/${characterIdList}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterListGetEndpointSchema.parse(result);

      return validatedResult.map(CharacterEndpointToDomain);
    },

    getCharacterList: async (
      page
    ): Promise<{ characterPreviewList: CharacterPreview[]; pages: number }> => {
      const response = await fetch(baseUrl + `?page=${page}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterGetEndpointSchema.parse(result);

      return {
        characterPreviewList: validatedResult.results.map(
          CharacterEndpointToPreview
        ),
        pages: validatedResult.info.pages,
      };
    },

    findById: async (id): Promise<Character> => {
      const response = await fetch(baseUrl + `/${id}`);

      const result = await response.json();

      const validatedResult = CharacterEndpointSchema.parse(result);

      return CharacterEndpointToDomain(validatedResult);
    },
  };
};
