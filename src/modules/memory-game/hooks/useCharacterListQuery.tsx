import { useQuery } from '@tanstack/react-query';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';

export type UseCharacterListQueryResult = ReturnType<
  typeof useCharacterListQuery
>;

export function useCharacterListQuery(boardSize: BoardSize) {
  const { data, refetch, ...props } = useQuery(
    MemoryGameQueryKeys.characterList(boardSize),
    async ({ signal }) => {
      const apiCharactersRepository = ApiCharactersRepository(signal);

      const charactersCount = await apiCharactersRepository.getCount();

      const characterList =
        await apiCharactersRepository.getRamdomCharacterList({
          count: charactersCount,
          limit: boardSize / 2,
        });

      return characterList || [];
    },
    { refetchOnWindowFocus: false, refetchInterval: false }
  );

  return { characterList: data, characterListRefetch: refetch, ...props };
}
