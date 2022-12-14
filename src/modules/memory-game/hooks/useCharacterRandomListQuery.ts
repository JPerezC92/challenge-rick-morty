import { useQuery } from '@tanstack/react-query';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { randomUniqueIntArray } from 'src/modules/shared/utils/randomUniqueIntArray';

export type UseCharacterListQueryResult = ReturnType<
  typeof useCharacterRandomListQuery
>;

interface CharacterListQueryProps {
  size: number;
  enabled?: boolean;
}

export function useCharacterRandomListQuery({
  size,
  enabled,
}: CharacterListQueryProps) {
  return useQuery(
    MemoryGameQueryKeys.randomCharacterList(size),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);

      const charactersCount = await charactersRepository.getCount();

      const characterIdList = randomUniqueIntArray({
        length: size,
        max: charactersCount,
      });

      const characterList = await charactersRepository.findManyById({
        characterIdList,
      });

      return characterList || [];
    },
    { refetchOnWindowFocus: false, refetchInterval: false, enabled }
  );
}
