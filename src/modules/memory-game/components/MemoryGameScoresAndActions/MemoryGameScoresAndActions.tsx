import { useRouter } from 'next/router';
import React from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { VscDebugRestart } from 'react-icons/vsc';
import { MemoryGameDialog } from 'src/modules/memory-game/components/MemoryGameDialog';
import { MemoryGameAccuracy } from 'src/modules/memory-game/containers/MemoryGameAccuracy';
import { MemoryGameMovesCount } from 'src/modules/memory-game/containers/MemoryGameMovesCount';
import { MemoryGameRoundsCount } from 'src/modules/memory-game/containers/MemoryGameRoundsCount';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestartEvent';
import { Button } from 'src/modules/shared/components/Button';
import { Icon } from 'src/modules/shared/components/Icon';

type MemoryGameScoresAndActionsProps = {
  className?: string;
};

export const MemoryGameScoresAndActions: React.FC<
  MemoryGameScoresAndActionsProps
> = ({ className }) => {
  const router = useRouter();

  return (
    <footer
      className={`z-10 rotate-180 border border-ct-secondary-200 bg-gradient-to-b from-ct-primary-600/80 via-ct-primary-400/80 to-ct-primary-600/80 shadow-sm shadow-ct-secondary-400 backdrop-blur-sm md:rounded-b-lg ${className} `}
    >
      <div className="grid rotate-180 grid-cols-5 gap-1 p-1 sm:gap-x-10 sm:p-3">
        <MemoryGameMovesCount />
        <MemoryGameAccuracy />
        <MemoryGameRoundsCount />

        <MemoryGameDialog
          trigger={
            <Button secondary outline>
              <Icon Icon={VscDebugRestart} />{' '}
              <span className="hidden md:inline">Restart</span>
            </Button>
          }
          title="Are you sure you want to restart?"
          onConfirm={(close) => {
            close();
            MemoryGameRestartEvent.trigger();
          }}
        />

        <MemoryGameDialog
          trigger={
            <Button tertiary outline>
              <Icon Icon={TbDoorExit} />{' '}
              <span className="hidden md:inline">Exit</span>
            </Button>
          }
          title="Are you sure you want to exit?"
          onConfirm={(close) => router.push('/memory-game')}
        />
      </div>
    </footer>
  );
};
