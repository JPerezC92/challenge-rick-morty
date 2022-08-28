import React from 'react';

import { MemoryGameBoardOverlay } from 'src/modules/memory-game/components/MemoryGameBoardOverlay';
import { MemoryGameBoardSkeleton } from 'src/modules/memory-game/components/MemoryGameBoardSkeleton';
import { MemoryGameLayout } from 'src/modules/memory-game/components/MemoryGameLayout';
import { MemoryGameScoresAndActions } from 'src/modules/memory-game/components/MemoryGameScoresAndActions';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { useMemoryGameConfigurationContext } from 'src/modules/memory-game/context/MemoryGameConfigurationContext';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { useCharacterListQuery } from 'src/modules/memory-game/hooks/useCharacterListQuery';
import { NextPageWithLayout } from 'src/pages/_app';

const NewGamePage: NextPageWithLayout = () => {
  const { boardSize, isLoading: configurationIsLoading } =
    useMemoryGameConfigurationContext();

  const {
    characterList = [],
    characterListRefetch,
    isRefetching,
    isLoading,
  } = useCharacterListQuery({ boardSize, enabled: !configurationIsLoading });

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
          topBar={
            <MemoryGameSelectedCards
              className="sticky top-0"
              selectCardEvent={MemoryGameSelectCardEvent}
              restartEvent={MemoryGameRestartEvent}
            />
          }
          board={
            !characterList.length || isLoading || isRefetching ? (
              <MemoryGameBoardSkeleton />
            ) : (
              <MemoryGameBoard
                className="py-4 px-2"
                characterList={characterList}
                gameOverEvent={MemoryGameGameOverEvent}
                moveFinishedEvent={MemoryGameMoveFinishedEvent}
                selectCardEvent={MemoryGameSelectCardEvent}
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
