import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

type MemoryGameAccuracyProps = {
  className?: string;
  accuracyChangeEvent: MemoryGameAccuracyChangeEvent;
};

export const MemoryGameAccuracy: React.FC<MemoryGameAccuracyProps> = ({
  className = '',
  accuracyChangeEvent,
}) => {
  const [accuracy, setAccuracy] = React.useState(0);

  React.useEffect(() => {
    const cleanup = accuracyChangeEvent.listener((accuracyChange) => {
      if (accuracy === accuracyChange) return;
      setAccuracy(accuracyChange);
    });

    return () => cleanup();
  }, [accuracy, accuracyChangeEvent]);

  return (
    <MemoryGameScore
      data-testid="accuracy"
      className={className}
      desc="accuracy"
      value={accuracy}
    />
  );
};
