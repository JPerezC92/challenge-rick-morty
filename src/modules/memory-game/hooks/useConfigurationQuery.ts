import { useQuery } from '@tanstack/react-query';
import { Board } from 'src/modules/memory-game/models/Board';
import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { isClient } from 'src/modules/shared/utils/applicationSide';

const BoardSizeDefault = Board.sizes[0];

export function useConfigurationQuery() {
  const { data: boardSize = BoardSizeDefault, isLoading } = useQuery(
    MemoryGameQueryKeys.configuration(),
    (): BoardSize => {
      const sizeString =
        LocalStorageService.getItem(MemoryGameLSKeys.BoardSize) || '';
      const size = parseInt(sizeString) as BoardSize;
      return isNaN(size) || !size ? BoardSizeDefault : size;
    },
    { enabled: isClient() }
  );

  return { boardSize, isLoading };
}
