import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';

import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { MemoryGameBoardOverlay } from 'src/modules/memory-game/components/MemoryGameBoardOverlay';
import { MemoryGameBoardSkeleton } from 'src/modules/memory-game/components/MemoryGameBoardSkeleton';
import { MemoryGameScoresAndActions } from 'src/modules/memory-game/components/MemoryGameScoresAndActions';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestartEvent';

const NewGamePage: NextPage = () => {
  const {
    data: characterList = [],
    refetch: characterListRefetch,
    isRefetching,
    isLoading,
  } = useQuery(
    ['characterList'],
    async ({ signal }) => {
      const apiCharactersRepository = ApiCharactersRepository(signal);

      const charactersCount = await apiCharactersRepository.getCount();

      const characterList =
        await apiCharactersRepository.getRamdomCharacterList({
          count: charactersCount,
          limit: 6,
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
    <div className="h-full bg-[url('/memory-game-wallpaper.png')] bg-cover bg-no-repeat">
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
    </div>
  );
};

export default NewGamePage;
