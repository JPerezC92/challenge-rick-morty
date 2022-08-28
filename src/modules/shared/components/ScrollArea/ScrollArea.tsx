import React from 'react';
import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';

type ScrollAreaProps = {
  className?: string;
  children?: React.ReactElement;
};

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  className,
  children,
}) => {
  return (
    <ScrollAreaPrimitives.Root
      className={`h-full max-h-[inherit] min-h-[inherit] overflow-hidden rounded-[inherit] ${className}`}
      type="auto"
    >
      <ScrollAreaPrimitives.Viewport className="!block h-full max-h-max min-h-[inherit] rounded-[inherit]">
        {children}
      </ScrollAreaPrimitives.Viewport>

      <ScrollAreaPrimitives.ScrollAreaScrollbar
        className="my-1 w-1 rounded bg-ct-neutral-dark-700/20"
        orientation="vertical"
      >
        <ScrollAreaPrimitives.Thumb className="w-2 rounded bg-ct-secondary-400/80" />
      </ScrollAreaPrimitives.ScrollAreaScrollbar>

      <ScrollAreaPrimitives.ScrollAreaScrollbar
        className="mx-1 w-1 rounded bg-ct-neutral-dark-700/20"
        orientation="horizontal"
      >
        <ScrollAreaPrimitives.Thumb className="w-2 rounded bg-ct-secondary-400/80" />
      </ScrollAreaPrimitives.ScrollAreaScrollbar>

      <ScrollAreaPrimitives.ScrollAreaCorner />
    </ScrollAreaPrimitives.Root>
  );
};
