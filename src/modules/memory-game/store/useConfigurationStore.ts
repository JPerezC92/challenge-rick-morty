import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { Board } from 'src/modules/memory-game/models/Board';
import { ConfigurationStoreRepository } from 'src/modules/memory-game/models/ConfigurationStoreRepository';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { ConfigurationState } from 'src/modules/memory-game/store/configurationStore';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';

export const useConfigurationStore = create(
  devtools<ConfigurationState & ConfigurationStoreRepository>((set, get) => ({
    boardSize: 12,
    isLoaded: false,
    gameMode: GameModes.NORMAL,
    loadConfiguration: (boardSize: number) =>
      set({ boardSize, isLoaded: true }),
    changeBoardSize: (boardSize: number) => {
      if (!Board.sizes.includes(boardSize)) return;

      LocalStorageService.setItem(
        MemoryGameLSKeys.BoardSize,
        boardSize.toString()
      );
      set({ boardSize });
    },

    changeGameMode: (gameMode: `${GameModes}`) => {
      LocalStorageService.setItem(MemoryGameLSKeys.GameMode, gameMode);
      set({ gameMode });
    },
  }))
);
