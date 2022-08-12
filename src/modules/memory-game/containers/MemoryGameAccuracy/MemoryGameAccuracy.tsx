import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

type MemoryGameAccuracyProps = {
  className?: string;
};

export const MemoryGameAccuracy: React.FC<MemoryGameAccuracyProps> = ({
  className = '',
}) => {
  const [accuracy, setAccuracy] = React.useState(0);

  React.useEffect(() => {
    const cleanup = MemoryGameMoveFinishedEvent.listener((e) =>
      setAccuracy(e.accuracy)
    );

    return () => cleanup();
  }, []);

  return (
    <MemoryGameScore className={className} desc="accuracy" value={accuracy} />
  );
};
