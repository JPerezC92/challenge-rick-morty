import { useRouter } from 'next/router';
import React from 'react';
import { MemoryGameAccuracy } from 'src/modules/memory-game/containers/MemoryGameAccuracy';
import { MemoryGameExitButton } from 'src/modules/memory-game/containers/MemoryGameExitButton';
import { MemoryGameMovesCount } from 'src/modules/memory-game/containers/MemoryGameMovesCount';
import { MemoryGameRestartButton } from 'src/modules/memory-game/containers/MemoryGameRestartButton';
import { MemoryGameRoundsCount } from 'src/modules/memory-game/containers/MemoryGameRoundsCount';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';

type MemoryGameScoresAndActionsProps = {
  className?: string;
};

export const MemoryGameScoresAndActions: React.FC<
  MemoryGameScoresAndActionsProps
> = ({ className }) => {
  return (
    <footer
      className={`z-10 rotate-180 border border-ct-secondary-200 bg-gradient-to-b from-ct-primary-600/80 via-ct-primary-400/80 to-ct-primary-600/80 shadow-sm shadow-ct-secondary-400 backdrop-blur-sm md:rounded-b-lg ${className} `}
    >
      <div className="grid rotate-180 grid-cols-5 gap-1 p-1 sm:gap-x-10 sm:p-3">
        <MemoryGameMovesCount moveFinishedEvent={MemoryGameMoveFinishedEvent} />
        <MemoryGameAccuracy moveFinishedEvent={MemoryGameMoveFinishedEvent} />
        <MemoryGameRoundsCount gameOverEvent={MemoryGameGameOverEvent} />
        <MemoryGameRestartButton restartEvent={MemoryGameRestartEvent} />
        <MemoryGameExitButton />
      </div>
    </footer>
  );
};
