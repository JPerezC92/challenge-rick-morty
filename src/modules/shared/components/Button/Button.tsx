import React from 'react';
import { Text } from 'src/modules/shared/components/Text';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  outline?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      outline,
      primary,
      secondary,
      tertiary,
      ...props
    },
    ref
  ) => {
    const background =
      primary && !outline
        ? 'border-2 border-ct-primary-400 bg-ct-primary-600 text-ct-neutral-ligth-500 shadow-ct-primary-600 hover:bg-ct-primary-400 hover:text-ct-neutral-ligth-200'
        : secondary && !outline
        ? 'bg-ct-info-400/50 text-ct-error-700 hover:text-ct-error-400 hover:bg-ct-info-400/90'
        : tertiary && !outline
        ? 'bg-cyan-400/50 hover:bg-cyan-400'
        : '';

    const outlineColor =
      primary && outline
        ? 'border border-teal-400/50 hover:border-teal-400 hover:bg-teal-500/5'
        : secondary && outline
        ? 'border bg-ct-secondary-800/80 border-ct-secondary-500/50 border-2 text-ct-secondary-500 hover:border-ct-secondary-500 hover:text-ct-secondary-300 hover:bg-ct-secondary-700/80'
        : tertiary && outline
        ? 'border bg-ct-error-800/80 border-ct-error-500/50 border-2 text-ct-error-500 hover:border-ct-error-500 hover:text-ct-error-300 hover:bg-ct-error-700/80'
        : '';

    return (
      <button
        className={`whitespace-nowrap rounded-lg p-2 shadow-sm transition-all ease-in-out disabled:pointer-events-none disabled:border-gray-400 disabled:opacity-60 ${background} ${outlineColor} ${className}`}
        {...props}
        ref={ref}
      >
        <Text l1>{children}</Text>
      </button>
    );
  }
);

Button.displayName = 'Button';
