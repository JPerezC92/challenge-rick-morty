import React from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { VscDebugRestart } from 'react-icons/vsc';
import { MemoryGameAccuracy } from 'src/modules/memory-game/containers/MemoryGameAccuracy';
import { MemoryGameMovesCount } from 'src/modules/memory-game/containers/MemoryGameMovesCount';
import { MemoryGameRoundsCount } from 'src/modules/memory-game/containers/MemoryGameRoundsCount';
import { Button } from 'src/modules/shared/components/Button';
import { Icon } from 'src/modules/shared/components/Icon';

type MemoryGameScoresAndActionsProps = {
  className?: string;
};

export const MemoryGameScoresAndActions: React.FC<
  MemoryGameScoresAndActionsProps
> = ({ className }) => {
  return (
    <footer
      className={`z-10 rotate-180 border border-ct-secondary-200 bg-gradient-to-b from-ct-primary-600/80 via-ct-primary-400/80 to-ct-primary-600/80 shadow-sm shadow-ct-secondary-400 backdrop-blur-sm md:rounded-b-lg ${className} `}
    >
      <div className="grid rotate-180 grid-cols-5 gap-1 p-1 sm:gap-x-10 sm:p-3">
        <MemoryGameMovesCount />
        <MemoryGameAccuracy />
        <MemoryGameRoundsCount />

        <Button secondary outline>
          <Icon Icon={VscDebugRestart} className="block" />
        </Button>

        <Button tertiary outline>
          <Icon Icon={TbDoorExit} className="block" />
        </Button>
      </div>
    </footer>
  );
};