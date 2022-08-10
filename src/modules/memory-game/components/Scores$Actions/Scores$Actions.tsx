import React from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { Button } from 'src/modules/shared/components/Button';
import { Text } from 'src/modules/shared/components/Text';

type Scores$ActionsProps = {
  className?: string;
  moves: number;
};

export const Scores$Actions: React.FC<Scores$ActionsProps> = ({
  className,
  moves,
}) => {
  return (
    <footer
      className={`z-10 rotate-180 bg-gradient-to-r from-ct-primary-600/80 via-ct-primary-300/80 to-ct-primary-600/80 p-2 shadow-sm shadow-ct-secondary-400 ${className}`}
    >
      <div className="flex rotate-180 justify-between">
        <div className="grid auto-cols-min  place-items-center rounded bg-ct-primary-800/10 p-1">
          <Text l1>{moves}</Text>
          <Text l2={true}>Moves</Text>
        </div>

        <Button secondary>
          <i>
            <TbDoorExit className="text-xl sm:text-2xl" />
          </i>
        </Button>
      </div>
    </footer>
  );
};
