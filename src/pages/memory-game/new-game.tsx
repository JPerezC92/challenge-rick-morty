import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';

import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import * as MemoryGameGameOverEvent from 'src/modules/memory-game/events/MemoryGameGameOver.event';

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
    const cleanup = MemoryGameGameOverEvent.Listener(() =>
      characterListRefetch({ stale: true })
    );

    return () => cleanup();
  }, [characterListRefetch]);

  if (!characterList.length || isLoading || isRefetching) {
    return <>Loading...</>;
  }

  return (
    <div>
      <main className="max-w-lg sm:max-w-3xl">
        <MemoryGameBoard
          characterList={characterList}
          className="grid auto-rows-min"
        />
      </main>
    </div>
  );
};

export default NewGamePage;