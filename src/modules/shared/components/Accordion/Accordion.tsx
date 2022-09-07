import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

type AccordionProps = {
  className?: string;
  children?: React.ReactNode;
  defaultValue?: string;
};

export const Accordion: React.FC<AccordionProps> = ({
  className = '',
  children,
  defaultValue,
}) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      className={`${className}`}
      defaultValue={defaultValue}
    >
      {children}
    </AccordionPrimitive.Root>
  );
};
