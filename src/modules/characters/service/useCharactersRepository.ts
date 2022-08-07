import { CharacterEndpointToDomain } from 'src/modules/characters/adapters/CharacterEndpointToDomain';
import {
  CharacterGetEndpoint,
  CharacterGetEndpointSchema,
} from 'src/modules/characters/dto/CharacterGetEndpoint';
import { CharacterListGetEndpointSchema } from 'src/modules/characters/dto/CharacterListGetEndpoint';
import { Character } from 'src/modules/characters/models/Character';
import { CharactersRepository } from 'src/modules/characters/service/CharactersRepository';
import { Repository } from 'src/modules/shared/service/Repository';
import { RICK_MORTY_BASE_URL } from 'src/modules/shared/utils/constants';
import { randomUniqueIntArray } from 'src/modules/shared/utils/randomUniqueIntArray';

export const ApiCharactersRepository: Repository<CharactersRepository> = (
  signal
) => {
  const baseUrl = RICK_MORTY_BASE_URL + '/character';

  return {
    getCount: async () => {
      const response = await fetch(baseUrl, { signal });

      const result = (await response.json()) as CharacterGetEndpoint | void;

      const validatedResult = CharacterGetEndpointSchema.parse(result);

      return validatedResult.info.count;
    },

    getRamdomCharacterList: async ({
      count,
      limit = 2,
    }): Promise<Character[] | void> => {
      const numberArray = randomUniqueIntArray({ length: limit, max: count });

      const response = await fetch(baseUrl + `/${numberArray}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterListGetEndpointSchema.parse(result);

      return validatedResult.map(CharacterEndpointToDomain);
    },
  };
};
