import * as DialogPrimitives from '@radix-ui/react-dialog';
import React from 'react';
import { Button } from 'src/modules/shared/components/Button';
import { Heading } from 'src/modules/shared/components/Heading';

type MemoryGameDialogProps = {
  className?: string;
  trigger: React.ReactElement;
  title?: string;
  description?: React.ReactNode;
  onConfirm?: (
    close: () => void,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const MemoryGameDialog: React.FC<MemoryGameDialogProps> = ({
  className = '',
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <DialogPrimitives.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitives.Trigger asChild>{trigger}</DialogPrimitives.Trigger>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay className="fixed inset-0 z-10 bg-ct-neutral-dark-600/90" />
        <DialogPrimitives.Content
          className={`fixed top-1/2 left-1/2 z-10 w-11/12 max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-xl border-4 border-ct-special-ligth-400 bg-ct-neutral-dark-800/50 p-4 ${className}`}
        >
          <DialogPrimitives.Title asChild>
            <Heading as="h2" dialog className="mb-4 text-ct-special-ligth-200">
              {title}
            </Heading>
          </DialogPrimitives.Title>

          <DialogPrimitives.Description>
            {description}
          </DialogPrimitives.Description>

          <div className="grid grid-cols-2 gap-4">
            <DialogPrimitives.Close asChild>
              <Button l1 tertiary onClick={onCancel}>
                Cancel
              </Button>
            </DialogPrimitives.Close>

            <Button l1 primary onClick={(e) => onConfirm?.(handleClose, e)}>
              Confirm
            </Button>
          </div>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};
