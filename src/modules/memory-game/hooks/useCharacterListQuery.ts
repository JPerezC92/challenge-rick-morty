import { useQuery } from '@tanstack/react-query';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';

export type UseCharacterListQueryResult = ReturnType<
  typeof useCharacterListQuery
>;

interface CharacterListQueryProps {
  boardSize: BoardSize;
  enabled?: boolean;
}

export function useCharacterListQuery({
  boardSize,
  enabled,
}: CharacterListQueryProps) {
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
    { refetchOnWindowFocus: false, refetchInterval: false, enabled }
  );

  return {
    characterList: data,
    characterListRefetch: refetch,
    ...props,
  };
}
