import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';
import { TbSelect } from 'react-icons/tb';
import { Icon } from 'src/modules/shared/components/Icon';

type SelectProps = {
  children?: React.ReactElement | React.ReactElement[];
  value: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<SelectProps> = ({
  onChange,
  value,
  children,
}) => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <SelectPrimitive.Root
      open={toggle}
      onOpenChange={setToggle}
      value={value}
      onValueChange={onChange}
    >
      <SelectPrimitive.SelectTrigger className="inline-flex items-center justify-center rounded-lg border border-ct-secondary-100 px-2 align-middle">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <Icon className="ml-4 text-ct-primary-400" as={TbSelect} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.SelectTrigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="h-56 min-h-[14rem] w-full overflow-auto rounded-lg border border-ct-neutral-dark-400 bg-ct-neutral-dark-800">
          <ScrollAreaPrimitive.ScrollArea
            type="auto"
            className="grid h-full w-full"
          >
            <SelectPrimitive.SelectViewport>
              <ScrollAreaPrimitive.ScrollAreaViewport className="h-full w-full px-2 py-1">
                {children}
              </ScrollAreaPrimitive.ScrollAreaViewport>
            </SelectPrimitive.SelectViewport>

            <ScrollAreaPrimitive.Scrollbar
              className="my-1 w-1 rounded bg-ct-neutral-dark-700/20"
              orientation="vertical"
            >
              <ScrollAreaPrimitive.Thumb className="w-2 rounded bg-ct-secondary-400/80" />
            </ScrollAreaPrimitive.Scrollbar>

            <ScrollAreaPrimitive.Scrollbar
              className="mx-1 w-1 rounded bg-ct-neutral-dark-700/20"
              orientation="horizontal"
            >
              <ScrollAreaPrimitive.Thumb className="w-2 rounded bg-ct-secondary-400/80" />
            </ScrollAreaPrimitive.Scrollbar>
          </ScrollAreaPrimitive.ScrollArea>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
