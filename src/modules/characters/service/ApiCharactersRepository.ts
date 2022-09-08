import { CharacterEndpointToModel } from 'src/modules/characters/adapters/CharacterEndpointToModel';
import { Character } from 'src/modules/characters/models/Character';
import { CharactersRepository } from 'src/modules/characters/service/CharactersRepository';
import { CharacterEndpointSchema } from 'src/modules/characters/validators/CharacterEndpoint.schema';
import { CharacterListEndpointSchema } from 'src/modules/characters/validators/CharacterListEndpoint.schema';
import { CharacterPaginatedEndpointSchema } from 'src/modules/characters/validators/CharacterPaginatedEndpoint.schema';
import { Repository } from 'src/modules/shared/service/Repository';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';

export const ApiCharactersRepository: Repository<CharactersRepository> = (
  signal
) => {
  const baseUrl = EnvironmentVariable.RICK_MORTY_BASE_URL + '/character';

  return {
    getCount: async (): Promise<number> => {
      const response = await fetch(baseUrl, { signal });

      const result = await response.json();

      const validatedResult = CharacterPaginatedEndpointSchema.parse(result);

      return validatedResult.info.count;
    },

    findManyById: async ({ characterIdList }): Promise<Character[]> => {
      const response = await fetch(baseUrl + `/${characterIdList}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterListEndpointSchema.parse(result);

      return validatedResult.map(CharacterEndpointToModel);
    },

    paginatedCharacterList: async (
      page
    ): Promise<{ characterList: Character[]; pages: number }> => {
      const response = await fetch(baseUrl + `?page=${page}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterPaginatedEndpointSchema.parse(result);

      return {
        characterList: validatedResult.results.map(CharacterEndpointToModel),
        pages: validatedResult.info.pages,
      };
    },

    findById: async (id): Promise<Character> => {
      const response = await fetch(baseUrl + `/${id}`, { signal });

      const result = await response.json();

      const validatedResult = CharacterEndpointSchema.parse(result);

      return CharacterEndpointToModel(validatedResult);
    },
  };
};
