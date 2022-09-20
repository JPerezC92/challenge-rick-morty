import React from 'react';

import { MemoryGameAttempts } from 'src/modules/memory-game/containers/MemoryGameAttempts';
import { MemoryGameCardSelected } from 'src/modules/memory-game/containers/MemoryGameCardSelected';
import { MemoryGameTimer } from 'src/modules/memory-game/containers/MemoryGameTimer';
import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { GameModes } from 'src/modules/memory-game/models/GameModes';

type MemoryGameTopBarProps = {
  className?: string;
  gameMode: `${GameModes}`;
  boardSize: BoardSize[keyof BoardSize];
};

export const MemoryGameTopBar: React.FC<MemoryGameTopBarProps> = ({
  className = '',
  gameMode,
  boardSize,
}) => {
  return (
    <header
      className={`grid grid-cols-[1fr_auto_1fr] border border-ct-error-200 bg-gradient-to-r from-ct-secondary-700/90 via-ct-error-800/90 to-ct-secondary-700/90 p-2 shadow-sm shadow-ct-error-500 sm:p-3 md:rounded-b-2xl ${className}`}
    >
      <MemoryGameCardSelected
        index={0}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />

      {gameMode === GameModes.NORMAL ? (
        <hr className="mx-1 h-full border-l-2 border-ct-error-400" />
      ) : gameMode === GameModes.LIMITED_TRIES ? (
        <MemoryGameAttempts
          className="mx-3 scale-[130%]"
          boardSize={boardSize}
          errorIncrease={MemoryGameErrorIncreaseEvent}
          imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
        />
      ) : (
        gameMode === GameModes.LIMITED_TIME && (
          <MemoryGameTimer
            className="mx-3 scale-[130%]"
            boardSize={boardSize}
            restartEvent={MemoryGameRestartEvent}
            selectCardEvent={MemoryGameSelectCardEvent}
            imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
          />
        )
      )}

      <MemoryGameCardSelected
        index={1}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    </header>
  );
};
