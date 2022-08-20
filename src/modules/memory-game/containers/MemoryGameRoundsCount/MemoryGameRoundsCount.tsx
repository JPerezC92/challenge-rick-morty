import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { MemoryGameScore } from 'src/modules/memory-game/components/MemoryGameScore';
import { MemoryGameScoreSkeleton } from 'src/modules/memory-game/components/MemoryGameScoreSkeleton';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { Counter } from 'src/modules/memory-game/models/Counter';
import { MemoryGameQueryKeys } from 'src/modules/memory-game/models/MemoryGameQueryKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { useRoundsCountQuery } from './useRoundsCountQuery';

type MemoryGameRoundsCountProps = {
  className?: string;
  gameOverEvent: MemoryGameGameOverEvent;
};

export const MemoryGameRoundsCount: React.FC<MemoryGameRoundsCountProps> = ({
  className = '',
  gameOverEvent,
}) => {
  const qc = useQueryClient();
  const { roundsCount, isLoading } = useRoundsCountQuery();

  React.useEffect(() => {
    const cleanup = gameOverEvent.listener(() => {
      qc.setQueryData<Counter>(MemoryGameQueryKeys.roundsCount(), (c) => {
        const roundsCount = c?.increment();

        LocalStorageService.setItem(
          MemoryGameLSKeys.RoundsCount,
          JSON.stringify(roundsCount?.value)
        );

        return roundsCount;
      });
    });

    return () => cleanup();
  }, [gameOverEvent, qc]);

  if (isLoading) {
    return <MemoryGameScoreSkeleton />;
  }

  return (
    <MemoryGameScore
      className={`${className}`}
      desc="rounds"
      value={roundsCount?.value}
    />
  );
};
