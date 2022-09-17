import React from 'react';

import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { Tries } from 'src/modules/memory-game/models/Tries';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameAttemptsProps = {
  className?: string;
  boardSize: BoardSize[keyof BoardSize];
  errorIncrease: MemoryGameErrorIncreaseEvent;
  imperativeGameOverEvent: MemoryGameImperativeGameOverEvent;
};

export const MemoryGameAttempts: React.FC<MemoryGameAttemptsProps> = ({
  className = '',
  errorIncrease,
  boardSize,
}) => {
  const [errorCount, setErrorCount] = React.useState(0);
  const attempts = Tries[boardSize];
  const attemptsRemaining = attempts - errorCount;

  React.useEffect(() => {
    errorIncrease.listener((errorCount) => {
      setErrorCount(errorCount);
    });
  }, [errorIncrease]);

  React.useEffect(() => {
    if (attemptsRemaining !== 0) return;
    MemoryGameImperativeGameOverEvent.trigger();
  }, [attemptsRemaining]);

  return (
    <span
      className={`h-full min-w-[3ch] rounded border border-ct-neutral-ligth-400 bg-ct-neutral-dark-400 px-2 text-center ${className}`}
    >
      <Text className="text-xl font-semibold text-ct-secondary-400" l1>
        {attemptsRemaining}
      </Text>
    </span>
  );
};
