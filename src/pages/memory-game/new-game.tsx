import React from 'react';

import { MemoryGameBoardOverlay } from 'src/modules/memory-game/components/MemoryGameBoardOverlay';
import { MemoryGameBoardSkeleton } from 'src/modules/memory-game/components/MemoryGameBoardSkeleton';
import { MemoryGameLayout } from 'src/modules/memory-game/components/MemoryGameLayout';
import { MemoryGameScoresAndActions } from 'src/modules/memory-game/components/MemoryGameScoresAndActions';
import { MemoryGameTopBar } from 'src/modules/memory-game/components/MemoryGameTopBar';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameMoveIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameMoveIncreaseEvent';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { useCharacterRandomListQuery } from 'src/modules/memory-game/hooks/useCharacterRandomListQuery';
import { useConfigurationStore } from 'src/modules/memory-game/store/useConfigurationStore';
import { NextPageWithLayout } from 'src/pages/_app';

const NewGamePage: NextPageWithLayout = () => {
  const configurationIsLoaded = useConfigurationStore((s) => s.isLoaded);
  const boardSize = useConfigurationStore((s) => s.boardSize);
  const gameMode = useConfigurationStore((s) => s.gameMode);

  const {
    data: characterList = [],
    refetch: characterListRefetch,
    isRefetching,
    isLoading,
  } = useCharacterRandomListQuery({
    size: boardSize / 2,
    enabled: configurationIsLoaded,
  });

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
      <main className="m-auto grid min-h-screen max-w-7xl">
        <MemoryGameBoardOverlay
          topBar={
            <MemoryGameTopBar
              className="!sticky !top-0 z-10"
              boardSize={boardSize}
              gameMode={gameMode}
            />
          }
          board={
            !characterList.length || isLoading || isRefetching ? (
              <MemoryGameBoardSkeleton size={boardSize} />
            ) : (
              <MemoryGameBoard
                className="py-4 px-2"
                gameMode={gameMode}
                characterList={characterList}
                accuracyChangeEvent={MemoryGameAccuracyChangeEvent}
                errorIncreaseEvent={MemoryGameErrorIncreaseEvent}
                gameOverEvent={MemoryGameGameOverEvent}
                moveIncreaseEvent={MemoryGameMoveIncreaseEvent}
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
