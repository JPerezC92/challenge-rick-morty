import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';
import { Text } from 'src/modules/shared/components/Text';

type OptionProps = {
  className?: string;
  value: string | number;
  children?: React.ReactNode;
};

export const Option: React.FC<OptionProps> = ({
  className = '',
  value,
  children,
}) => {
  return (
    <SelectPrimitive.SelectItem value={value.toString()}>
      <SelectPrimitive.SelectItemText>
        <Text
          as="div"
          l1
          className={`select-none px-1 py-2 font-semibold ${className}`}
        >
          {children}
        </Text>
      </SelectPrimitive.SelectItemText>
    </SelectPrimitive.SelectItem>
  );
};
