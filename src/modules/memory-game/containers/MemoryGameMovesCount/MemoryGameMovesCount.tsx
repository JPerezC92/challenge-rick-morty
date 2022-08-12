import React, { useEffect, useState } from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

type MemoryGameMovesCountProps = {
  className?: string;
};

export const MemoryGameMovesCount: React.FC<MemoryGameMovesCountProps> = ({
  className = '',
}) => {
  const [movesCount, setMovesCount] = useState(0);

  useEffect(() => {
    const cleanup = MemoryGameMoveFinishedEvent.listener((e) =>
      setMovesCount(e.movesCount)
    );

    return () => cleanup();
  }, []);

  return (
    <MemoryGameScore desc="Moves" value={movesCount} className={className} />
  );
};
