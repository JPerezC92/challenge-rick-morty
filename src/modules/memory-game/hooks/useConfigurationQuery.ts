import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { useConfigurationStore } from 'src/modules/memory-game/store/useConfigurationStore';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { isClient } from 'src/modules/shared/utils/applicationSide';

export function useConfigurationQuery() {
  const loadGameConfiguration = useConfigurationStore(
    (s) => s.loadConfiguration
  );

  const { data } = useQuery(
    MemoryGameQueryKeys.configuration(),
    () => {
      const sizeString =
        LocalStorageService.getItem(MemoryGameLSKeys.BoardSize) || '';
      const gameMode =
        (LocalStorageService.getItem(MemoryGameLSKeys.GameMode) as GameModes) ||
        GameModes.NORMAL;

      const size = parseInt(sizeString) as BoardSize[keyof BoardSize];

      return {
        boardSize: isNaN(size) || !size ? BoardSize[12] : size,
        gameMode,
      };
    },
    { enabled: isClient() }
  );

  React.useEffect(() => {
    if (!data) return;
    loadGameConfiguration(data);
  }, [data, loadGameConfiguration]);
}
