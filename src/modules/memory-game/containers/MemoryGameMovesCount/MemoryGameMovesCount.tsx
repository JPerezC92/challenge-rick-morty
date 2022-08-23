import React, { useEffect, useState } from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

type MemoryGameMovesCountProps = {
  className?: string;
  moveFinishedEvent: MemoryGameMoveFinishedEvent;
};

export const MemoryGameMovesCount: React.FC<MemoryGameMovesCountProps> = ({
  className = '',
  moveFinishedEvent,
}) => {
  const [movesCount, setMovesCount] = useState(0);

  useEffect(() => {
    const cleanup = moveFinishedEvent.listener((e) =>
      setMovesCount(e.movesCount)
    );

    return () => cleanup();
  }, [moveFinishedEvent]);

  return (
    <MemoryGameScore
      data-testid={'moves-count'}
      desc="Moves"
      value={movesCount}
      className={className}
    />
  );
};
