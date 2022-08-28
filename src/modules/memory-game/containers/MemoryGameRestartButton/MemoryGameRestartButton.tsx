import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { MemoryGameDialog } from 'src/modules/memory-game/containers/MemoryGameDialog';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { Button } from 'src/modules/shared/components/Button';
import { Icon } from 'src/modules/shared/components/Icon';

type MemoryGameRestartButtonProps = {
  className?: string;
  restartEvent: MemoryGameRestartEvent;
};

export const MemoryGameRestartButton: React.FC<
  MemoryGameRestartButtonProps
> = ({ className = '', restartEvent }) => {
  return (
    <MemoryGameDialog
      trigger={
        <Button l1 secondary outline className={className}>
          <Icon as={VscDebugRestart} />{' '}
          <span className="hidden md:inline">Restart</span>
        </Button>
      }
      title="Are you sure you want to restart?"
      onConfirm={(close) => {
        close();
        restartEvent.trigger();
      }}
    />
  );
};
