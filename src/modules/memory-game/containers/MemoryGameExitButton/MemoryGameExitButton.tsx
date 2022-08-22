import { useRouter } from 'next/router';
import React from 'react';
import { TbDoorExit } from 'react-icons/tb';
import { MemoryGameDialog } from 'src/modules/memory-game/containers/MemoryGameDialog';
import { Button } from 'src/modules/shared/components/Button';
import { Icon } from 'src/modules/shared/components/Icon';

type MemoryGameExitButtonProps = {
  className?: string;
};

export const MemoryGameExitButton: React.FC<MemoryGameExitButtonProps> = ({
  className = '',
}) => {
  const router = useRouter();

  return (
    <MemoryGameDialog
      trigger={
        <Button tertiary outline className={className}>
          <Icon Icon={TbDoorExit} />{' '}
          <span className="hidden md:inline">Exit</span>
        </Button>
      }
      title="Are you sure you want to exit?"
      onConfirm={() => router.push('/memory-game')}
    />
  );
};
