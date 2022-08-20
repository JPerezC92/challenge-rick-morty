import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { MemoryGameDialog } from 'src/modules/memory-game/components/MemoryGameDialog';
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
        <Button secondary outline className={className}>
          <Icon Icon={VscDebugRestart} />{' '}
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
