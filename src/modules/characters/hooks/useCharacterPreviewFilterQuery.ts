import { useQuery } from '@tanstack/react-query';
import { CharacterModelToView } from 'src/modules/characters/adapters/CharacterModelToView';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { CharactersListFilters } from 'src/modules/characters/models/CharactersListFilters';

export function useCharacterPreviewFilterQuery(
  query: CharactersListFilters,
  config?: { enabled?: boolean }
) {
  return useQuery(
    CharactersQueryKeys.characterListFilteredPaginated(query),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);

      const result = await charactersRepository.paginatedFilteredCharacterList(
        query
      );

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
