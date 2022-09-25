import * as DialogPrimitives from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Button } from 'src/modules/shared/components/Button';
import { Heading } from 'src/modules/shared/components/Heading';

type MemoryGameDialogProps = {
  className?: string;
  trigger?: React.ReactElement;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

export const MemoryGameDialog: React.FC<MemoryGameDialogProps> = ({
  className = '',
  trigger,
  title,
  content: description,
  onConfirm,
  onCancel,
  open,
  cancelButtonText,
  confirmButtonText,
}) => {
  const [isOpen, setIsOpen] = React.useState(!!open);

  return (
    <DialogPrimitives.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitives.Trigger asChild>{trigger}</DialogPrimitives.Trigger>
      <DialogPrimitives.Portal>
        <div>
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogPrimitives.Overlay className="fixed inset-0 z-10 bg-ct-neutral-dark-600/40" />
            <DialogPrimitives.Content
              className={`fixed top-1/2 left-1/2 z-10 w-11/12 max-w-lg -translate-x-[50%] -translate-y-[50%] rounded-xl border-4 border-ct-special-ligth-400 bg-ct-neutral-dark-800 p-4 ${className}`}
            >
              <DialogPrimitives.Title asChild>
                <Heading
                  as="h2"
                  dialog
                  className="mb-4 text-ct-special-ligth-200"
                >
                  {title}
                </Heading>
              </DialogPrimitives.Title>

              <DialogPrimitives.Description asChild>
                <div>{description}</div>
              </DialogPrimitives.Description>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <DialogPrimitives.Close asChild>
                  <Button l1 tertiary onClick={onCancel}>
                    {cancelButtonText || 'Cancel'}
                  </Button>
                </DialogPrimitives.Close>

                <Button
                  l1
                  primary
                  onClick={(e) => {
                    setIsOpen(false);
                    onConfirm?.(e);
                  }}
                >
                  {confirmButtonText || 'Confirm'}
                </Button>
              </div>
            </DialogPrimitives.Content>
          </motion.div>
        </div>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};
