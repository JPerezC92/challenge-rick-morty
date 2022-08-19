import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useConfigurationQuery } from 'src/modules/memory-game/hooks/useConfigurationQuery';
import { BoardSize } from 'src/modules/memory-game/models/BoardSizes';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';

type MemoryGameConfigurationContextProps = {
  children: React.ReactElement;
};

interface MemoryGameConfigurationState {
  boardSize: BoardSize;
  isLoading: boolean;
  setBoardSize: (size: BoardSize) => void;
}

const MemoryGameConfigurationContext =
  React.createContext<MemoryGameConfigurationState>(
    {} as MemoryGameConfigurationState
  );

export function useMemoryGameConfigurationContext() {
  const state = React.useContext(MemoryGameConfigurationContext);

  if (!state) {
    throw new Error(
      'useMemoryGameConfiguration should be called inside MemoryGameConfigurationProvider'
    );
  }

  return state;
}

const sizeStorageKey = 'size';

export const MemoryGameConfigurationProvider: React.FC<
  MemoryGameConfigurationContextProps
> = ({ children }) => {
  const qc = useQueryClient();

  const { boardSize, isLoading } = useConfigurationQuery(sizeStorageKey);

  const setBoardSizeRef = React.useRef((boardSize: BoardSize) => {
    LocalStorageService.setItem(
      MemoryGameLSKeys.BoardSize,
      boardSize.toString()
    );
    qc.setQueryData(MemoryGameQueryKeys.configuration(), () => boardSize);
  });

  return (
    <MemoryGameConfigurationContext.Provider
      value={{
        boardSize,
        isLoading,
        setBoardSize: setBoardSizeRef.current,
      }}
    >
      {children}
    </MemoryGameConfigurationContext.Provider>
  );
};
