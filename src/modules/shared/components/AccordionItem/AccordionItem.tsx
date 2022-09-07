import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';
import { Heading } from 'src/modules/shared/components/Heading';

type AccordionItemProps = {
  className?: string;
  trigger: React.ReactNode;
  content?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  value: string;
} & Parameters<typeof AccordionPrimitive.Item>['0'];

export const AccordionItem: React.FC<AccordionItemProps> = ({
  className = '',
  trigger,
  content,
  as = 'h3',
  value,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item {...props} value={value}>
      <AccordionPrimitive.Header asChild>
        <Heading as={as}>
          <AccordionPrimitive.Trigger className={className}>
            {trigger}
          </AccordionPrimitive.Trigger>
        </Heading>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content>{content}</AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};
