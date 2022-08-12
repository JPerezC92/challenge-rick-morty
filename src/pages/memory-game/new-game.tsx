import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';

import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { MemoryGameBoardOverlay } from 'src/modules/memory-game/components/MemoryGameBoardOverlay';
import { Scores$Actions } from 'src/modules/memory-game/components/Scores$Actions';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';

const NewGamePage: NextPage = () => {
  const {
    data: characterList = [],
    refetch: characterListRefetch,
    isRefetching,
    isLoading,
  } = useQuery(
    ['characterList'],
    async ({ signal }) => {
      const _characterRepository = ApiCharactersRepository(signal);

      const charactersCount = await _characterRepository.getCount();

      const characterList = await _characterRepository.getRamdomCharacterList({
        count: charactersCount,
        limit: 6,
      });

      return characterList || [];
    },
    { refetchOnWindowFocus: false, refetchInterval: false }
  );

  React.useEffect(() => {
    const cleanup = MemoryGameGameOverEvent.listener(() =>
      characterListRefetch()
    );

    return () => cleanup();
  }, [characterListRefetch]);

  return (
    <div className="h-full bg-gradient-to-r from-ct-neutral-dark-800 via-ct-neutral-medium-600 to-ct-neutral-dark-800">
      <main className="m-auto h-full max-w-3xl">
        <MemoryGameBoardOverlay
          topBar={<MemoryGameSelectedCards className="sticky top-0" />}
          board={
            !characterList.length || isLoading || isRefetching ? (
              <>Loading</>
            ) : (
              <MemoryGameBoard characterList={characterList} className="py-4" />
            )
          }
          bottomBar={
            <Scores$Actions className="sticky bottom-0 backdrop-blur-sm" />
          }
        />
      </main>
    </div>
  );
};

export default NewGamePage;
