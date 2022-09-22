import { useQuery } from '@tanstack/react-query';
import { CharacterModelToView } from 'src/modules/characters/adapters/CharacterModelToView';
import { CharacterView } from 'src/modules/characters/dto/CharacterView';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';

export function useCharacterPreviewQuery(
  page?: number,
  config?: { enabled?: boolean }
) {
  return useQuery(
    CharactersQueryKeys.characterListPaginated(page),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);
      const result = await charactersRepository.paginatedCharacterList(page);

      return {
        characterList: result.characterList.map(CharacterModelToView),
        pagesCount: result.pages,
      };
    },
    {
      ...config,
      retry: false,
      // keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
}
