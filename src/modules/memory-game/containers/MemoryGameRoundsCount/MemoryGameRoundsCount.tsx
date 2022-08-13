import React from 'react';
import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';

type MemoryGameRoundsCountProps = {
  className?: string;
};

const MemoryGameRoundsCountLocalStorage = 'MemoryGameRoundsCountLocalStorage ';

export const MemoryGameRoundsCount: React.FC<MemoryGameRoundsCountProps> = ({
  className = '',
}) => {
  const [roundsCount, setRoundsCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const item = window.localStorage.getItem(MemoryGameRoundsCountLocalStorage);
    if (item) setRoundsCount(Number(item));
    setIsLoading(false);

    const cleanup = MemoryGameGameOverEvent.listener(() => {
      setRoundsCount((s) => {
        const roundsCount = ++s;
        window.localStorage.setItem(
          MemoryGameRoundsCountLocalStorage,
          JSON.stringify(roundsCount)
        );
        return roundsCount;
      });
    });
    return () => cleanup();
  }, []);

  if (isLoading) {
    // TODO skeleton
    return <>...Loading</>;
  }

  return (
    <MemoryGameScore
      className={`${className}`}
      desc="rounds"
      value={roundsCount}
    />
  );
};
