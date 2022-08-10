import React from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { Button } from 'src/modules/shared/components/Button';
import { Text } from 'src/modules/shared/components/Text';

type Scores$ActionsProps = {
  className?: string;
};

export const Scores$Actions: React.FC<Scores$ActionsProps> = ({
  className,
}) => {
  return (
    <footer
      className={`z-10 flex justify-between rounded-t bg-ct-primary-300/90 p-2 backdrop-blur-sm ${className}`}
      // className={`z-10 grid min-h-fit grid-cols-[1fr_auto_1fr] rounded-t bg-ct-primary-300/90 p-2 backdrop-blur-sm ${className}`}
    >
      <div className="grid auto-cols-min  place-items-center rounded bg-ct-primary-800/10 p-1">
        <Text l1>5</Text>
        <Text l2={true}>Moves</Text>
      </div>

      <Button secondary>
        <i>
          <TbDoorExit className="text-xl sm:text-2xl" />
        </i>
      </Button>
    </footer>
  );
};
