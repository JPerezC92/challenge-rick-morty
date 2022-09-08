import { useQuery } from '@tanstack/react-query';
import { CharacterModelToView } from 'src/modules/characters/adapters/CharacterEndpointToView';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';

export function useCharacterPreviewQuery(
  page?: number,
  config?: { enabled?: boolean }
) {
  return useQuery(
    CharactersQueryKeys.characterList(page),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);
      const result = await charactersRepository.paginatedCharacterList(page);

      return {
        characterList: result.characterList.map(CharacterModelToView),
        pages: result.pages,
      };
    },
    {
      ...config,
      keepPreviousData: true,
      initialData: { characterList: [], pages: 0 },
    }
  );
}
