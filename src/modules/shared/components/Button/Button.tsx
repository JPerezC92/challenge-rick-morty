import React from 'react';
import { Text } from 'src/modules/shared/components/Text';

type ButtonProps = Parameters<typeof Text<'button'>>[0] & {
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
        ? 'border border-ct-primary-500 bg-ct-primary-600 text-ct-special-ligth-100 shadow-ct-primary-600 hover:bg-ct-primary-700'
        : secondary && !outline
        ? 'border border-ct-secondary-500 bg-ct-secondary-600 text-ct-special-ligth-100 shadow-ct-secondary-600 hover:bg-ct-secondary-700'
        : tertiary && !outline
        ? 'border border-ct-error-500 bg-ct-error-600 text-ct-special-ligth-100 shadow-ct-error-600 hover:bg-ct-error-700'
        : '';

    const outlineColor =
      primary && outline
        ? 'border bg-ct-primary-800/80 border-ct-primary-500/50 border-2 text-ct-primary-500 hover:border-ct-primary-500 hover:text-ct-primary-300 hover:bg-ct-primary-700/80'
        : secondary && outline
        ? 'border bg-ct-secondary-800/80 border-ct-secondary-500/50 border-2 text-ct-secondary-500 hover:border-ct-secondary-500 hover:text-ct-secondary-300 hover:bg-ct-secondary-700/80'
        : tertiary && outline
        ? 'border bg-ct-error-800/80 border-ct-error-500/50 border-2 text-ct-error-500 hover:border-ct-error-500 hover:text-ct-error-300 hover:bg-ct-error-700/80'
        : '';

    return (
      <Text
        as="button"
        className={`whitespace-nowrap rounded-lg p-2 font-semibold shadow-sm transition-all ease-in-out disabled:pointer-events-none disabled:border-gray-400 disabled:opacity-60 ${background} ${outlineColor} ${className}`}
        {...props}
        ref={ref}
      >
        {children}
      </Text>
    );
  }
);

Button.displayName = 'Button';
