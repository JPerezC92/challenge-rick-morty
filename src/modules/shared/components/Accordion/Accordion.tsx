import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

type AccordionProps = {
  className?: string;
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
};

export const Accordion: React.FC<AccordionProps> = ({
  className = '',
  children,
  defaultValue,
  value,
}) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      className={`${className}`}
      defaultValue={defaultValue}
      value={value}
      data-testid="accordion"
    >
      {children}
    </AccordionPrimitive.Root>
  );
};
