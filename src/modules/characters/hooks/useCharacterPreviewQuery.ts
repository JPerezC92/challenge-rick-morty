import { useQuery } from '@tanstack/react-query';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';

export function useCharacterPreviewQuery(
  page?: number,
  config?: {
    enabled?: boolean;
  }
) {
  return useQuery(
    CharactersQueryKeys.characterList(page),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);
      const characterPreviewList = await charactersRepository.getCharacterList(
        page
      );
      return characterPreviewList;
    },
    {
      ...config,
      keepPreviousData: true,
      initialData: { characterPreviewList: [], pages: 0 },
    }
  );
}
