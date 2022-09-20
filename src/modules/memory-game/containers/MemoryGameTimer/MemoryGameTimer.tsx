import React from 'react';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { Timer } from 'src/modules/memory-game/models/Timer';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameTimerProps = {
  className?: string;
  boardSize: BoardSize[keyof BoardSize];
  restartEvent: MemoryGameRestartEvent;
  selectCardEvent: MemoryGameSelectCardEvent;
  imperativeGameOverEvent: MemoryGameImperativeGameOverEvent;
};

export const MemoryGameTimer: React.FC<MemoryGameTimerProps> = ({
  className = '',
  boardSize,
  restartEvent,
  selectCardEvent,
  imperativeGameOverEvent,
}) => {
  const [isReady, setIsReady] = React.useState(false);
  const time = Timer[boardSize];
  const [timeRemaining, setTimeRemaining] = React.useState(time);

  React.useEffect(() => {
    const restartCleanup = restartEvent.listener(() => {
      setTimeRemaining(time);
      setIsReady(false);
    });

    const selectCardCleanup = selectCardEvent.listener(() => {
      if (isReady) return;
      setIsReady(true);
      selectCardCleanup();
    });

    return () => {
      selectCardCleanup();
      restartCleanup();
    };
  }, [isReady, restartEvent, selectCardEvent, time]);

  React.useEffect(() => {
    if (timeRemaining !== 0) return;

    imperativeGameOverEvent.trigger();
  }, [imperativeGameOverEvent, timeRemaining]);

  React.useEffect(() => {
    let timeInterval: NodeJS.Timer;

    if (!isReady) return;

    timeInterval = setInterval(() => {
      if (timeRemaining === 0) {
        window.clearTimeout(timeInterval);
        return;
      }

      setTimeRemaining((s) => s - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timeInterval);
    };
  }, [isReady, timeRemaining]);

  return (
    <span
      className={`h-full rounded border border-ct-neutral-ligth-400 bg-ct-neutral-dark-400 px-2 text-center ${className}`}
    >
      <Text l1 className="font-semibold text-ct-secondary-400">
        {timeRemaining}
      </Text>
    </span>
  );
};
