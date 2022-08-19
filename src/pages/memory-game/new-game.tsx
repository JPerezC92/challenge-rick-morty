import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { MemoryGameBoardOverlay } from 'src/modules/memory-game/components/MemoryGameBoardOverlay';
import { MemoryGameBoardSkeleton } from 'src/modules/memory-game/components/MemoryGameBoardSkeleton';
import { MemoryGameLayout } from 'src/modules/memory-game/components/MemoryGameLayout';
import { MemoryGameScoresAndActions } from 'src/modules/memory-game/components/MemoryGameScoresAndActions';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { useMemoryGameConfigurationContext } from 'src/modules/memory-game/context/MemoryGameConfigurationContext/MemoryGameConfigurationContext';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { NextPageWithLayout } from 'src/pages/_app';

const NewGamePage: NextPageWithLayout = () => {
  const { boardSize } = useMemoryGameConfigurationContext();
  const {
    data: characterList = [],
    refetch: characterListRefetch,
    isRefetching,
    isLoading,
  } = useQuery(
    ['characterList', boardSize],
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

  React.useEffect(() => {
    const restartCleanup = MemoryGameRestartEvent.listener(() =>
      characterListRefetch()
    );

    return () => {
      restartCleanup();
    };
  }, [characterListRefetch]);

  return (
    <>
      <main className="m-auto h-full max-w-7xl">
        <MemoryGameBoardOverlay
          topBar={<MemoryGameSelectedCards className="sticky top-0" />}
          board={
            !characterList.length || isLoading || isRefetching ? (
              <MemoryGameBoardSkeleton />
            ) : (
              <MemoryGameBoard
                characterList={characterList}
                className="py-4 px-2"
              />
            )
          }
          bottomBar={<MemoryGameScoresAndActions className="sticky bottom-0" />}
        />
      </main>
    </>
  );
};

export default NewGamePage;

NewGamePage.getLayout = (page) => <MemoryGameLayout>{page}</MemoryGameLayout>;
