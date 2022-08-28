import * as TooltipPrimitives from '@radix-ui/react-tooltip';
import React from 'react';
import { Text } from 'src/modules/shared/components/Text';
type TooltipProps = {
  className?: string;
  children?: React.ReactNode;
  content: string | number;
};

export const Tooltip: React.FC<TooltipProps> = ({
  className = '',
  content,
  children,
}) => {
  return (
    <TooltipPrimitives.Provider>
      <TooltipPrimitives.Root>
        <TooltipPrimitives.Trigger className={`${className}`} asChild>
          {children}
        </TooltipPrimitives.Trigger>
        <TooltipPrimitives.Portal>
          <TooltipPrimitives.Content
            sideOffset={3}
            className="rounded bg-ct-neutral-ligth-400 py-1 px-2 leading-[0] text-ct-secondary-300 shadow shadow-ct-neutral-ligth-800"
          >
            <TooltipPrimitives.Arrow
              className="text-ct-neutral-ligth-400"
              stroke="currentColor"
              fill="currentColor"
            />
            <Text l2>{content}</Text>
          </TooltipPrimitives.Content>
        </TooltipPrimitives.Portal>
      </TooltipPrimitives.Root>
    </TooltipPrimitives.Provider>
  );
};
