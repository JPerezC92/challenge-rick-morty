import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameMoveIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameMoveIncreaseEvent';

type MemoryGameMovesCountProps = {
  className?: string;
  moveIncreaseEvent: MemoryGameMoveIncreaseEvent;
};

export const MemoryGameMovesCount: React.FC<MemoryGameMovesCountProps> = ({
  className = '',
  moveIncreaseEvent,
}) => {
  const [movesCount, setMovesCount] = React.useState(0);

  React.useEffect(() => {
    const cleanup = moveIncreaseEvent.listener((mc) => {
      if (movesCount === mc) return;

      setMovesCount(mc);
    });

    return () => cleanup();
  }, [moveIncreaseEvent, movesCount]);
  return (
    <MemoryGameScore
      data-testid={'moves-count'}
      desc="Moves"
      value={movesCount}
      className={className}
    />
  );
};
