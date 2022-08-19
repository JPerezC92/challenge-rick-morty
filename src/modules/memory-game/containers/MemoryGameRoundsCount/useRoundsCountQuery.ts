import { useQuery } from '@tanstack/react-query';
import { Counter } from 'src/modules/memory-game/models/Counter';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { isClient } from 'src/modules/shared/utils/applicationSide';

export function useRoundsCountQuery() {
  const { data: roundsCount, isLoading } = useQuery(
    MemoryGameQueryKeys.roundsCount(),
    () => {
      const roundsCountValueString = LocalStorageService.getItem(
        MemoryGameLSKeys.RoundsCount
      );
      const roundsCountValue = Number(roundsCountValueString);

      return !roundsCountValue || isNaN(roundsCountValue)
        ? Counter.init()
        : new Counter(roundsCountValue);
    },
    { enabled: isClient() }
  );

  return { roundsCount, isLoading };
}
