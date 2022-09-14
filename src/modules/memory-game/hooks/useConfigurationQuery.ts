import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Board } from 'src/modules/memory-game/models/Board';

import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { useConfigurationStore } from 'src/modules/memory-game/store/useConfigurationStore';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { isClient } from 'src/modules/shared/utils/applicationSide';

const BoardSizeDefault = Board.sizes[0];

export function useConfigurationQuery() {
  const loadGameConfiguration = useConfigurationStore(
    (s) => s.loadConfiguration
  );

  const { data } = useQuery(
    MemoryGameQueryKeys.configuration(),
    (): number => {
      const sizeString =
        LocalStorageService.getItem(MemoryGameLSKeys.BoardSize) || '';
      const size = parseInt(sizeString) as number;

      return isNaN(size) || !size ? BoardSizeDefault : size;
    },
    { enabled: isClient() }
  );

  React.useEffect(() => {
    if (!data) return;
    loadGameConfiguration(data);
  }, [data, loadGameConfiguration]);
}
