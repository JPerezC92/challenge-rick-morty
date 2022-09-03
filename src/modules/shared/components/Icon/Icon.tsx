import React from 'react';
import { IconType } from 'react-icons';

enum IconVariant {
  XS = 'xs',
  SMALL = 'sm',
  BASE = 'base',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

type IconProps = {
  className?: string;
  as: IconType;
  variant?: `${IconVariant}`;
};

export const Icon = React.forwardRef<HTMLButtonElement, IconProps>(
  ({ className = '', as: Icon, variant = 'base' }, ref) => {
    return (
      <i className={`inline-block leading-[0] ${className}`} ref={ref}>
        <Icon
          className={`inline-block  text-inherit   ${
            variant === IconVariant.XS
              ? 'text-lg sm:text-xl'
              : variant === IconVariant.SMALL
              ? 'text-xl sm:text-2xl'
              : variant === IconVariant.BASE
              ? 'text-2xl sm:text-3xl'
              : variant === IconVariant.LARGE
              ? 'text-3xl sm:text-4xl'
              : variant === IconVariant.EXTRA_LARGE
              ? 'text-5xl sm:text-6xl'
              : '[font-size:inherit]'
          }`}
        />
      </i>
    );
  }
);

Icon.displayName = 'Icon';
