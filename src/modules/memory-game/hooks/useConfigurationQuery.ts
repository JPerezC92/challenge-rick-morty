import { useQuery } from '@tanstack/react-query';
import { Board } from 'src/modules/memory-game/models/Board';
import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { isClient } from 'src/modules/shared/utils/applicationSide';

const BoardSizeDefault = Board.sizes[0];

export function useConfigurationQuery(storageKey: string) {
  const { data: boardSize = BoardSizeDefault, isLoading } = useQuery(
    MemoryGameQueryKeys.configuration(),
    (): BoardSize => {
      const sizeString = window.localStorage.getItem(storageKey) || '';
      const size = parseInt(sizeString) as BoardSize;
      return isNaN(size) || !size ? BoardSizeDefault : size;
    },
    { enabled: isClient() }
  );

  return { boardSize, isLoading };
}
