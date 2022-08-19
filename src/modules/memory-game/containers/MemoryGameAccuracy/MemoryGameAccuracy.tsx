import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

type MemoryGameAccuracyProps = {
  className?: string;
  moveFinishedEvent: MemoryGameMoveFinishedEvent;
};

export const MemoryGameAccuracy: React.FC<MemoryGameAccuracyProps> = ({
  className = '',
  moveFinishedEvent,
}) => {
  const [accuracy, setAccuracy] = React.useState(0);

  React.useEffect(() => {
    const cleanup = moveFinishedEvent.listener((e) => setAccuracy(e.accuracy));

    return () => cleanup();
  }, [moveFinishedEvent]);

  return (
    <MemoryGameScore className={className} desc="accuracy" value={accuracy} />
  );
};
