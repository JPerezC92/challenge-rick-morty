import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  className?: string;
  as: IconType;
};

export const Icon = React.forwardRef<HTMLButtonElement, IconProps>(
  ({ className = '', as: Icon }, ref) => {
    return (
      <i className={`inline-block leading-[0] ${className}`} ref={ref}>
        <Icon className="inline-block text-2xl text-inherit sm:text-3xl" />
      </i>
    );
  }
);

Icon.displayName = 'Icon';
