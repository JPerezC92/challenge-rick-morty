import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';

type MemoryGameRoundsCountProps = {
  className?: string;
};

export const MemoryGameRoundsCount: React.FC<MemoryGameRoundsCountProps> = ({
  className = '',
}) => {
  const [roundsCount, setRoundsCount] = React.useState(0);

  React.useEffect(() => {
    const cleanup = MemoryGameGameOverEvent.listener(() =>
      setRoundsCount((s) => ++s)
    );
    return () => cleanup();
  }, []);

  return (
    <MemoryGameScore
      className={`${className}`}
      desc="rounds"
      value={roundsCount}
    />
  );
};
