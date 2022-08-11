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

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  primary,
  secondary,
  tertiary,
  outline,
  ...props
}) => {
  const background =
    primary && !outline
      ? 'bg-ct-primary-500/50 shadow-ct-primary-600 hover:bg-ct-primary-500'
      : secondary && !outline
      ? 'bg-ct-info-400/50 text-ct-error-700 hover:text-ct-error-400 hover:bg-ct-info-400/90'
      : tertiary && !outline
      ? 'bg-cyan-400/50 hover:bg-cyan-400'
      : '';

  const outlineColor =
    primary && outline
      ? 'border border-teal-400/50 hover:border-teal-400 hover:bg-teal-500/5'
      : secondary && outline
      ? 'border bg-ct-secondary-800/30 border-ct-secondary-500/50 border-2 text-ct-secondary-800 hover:border-ct-secondary-500 hover:text-ct-secondary-500 hover:bg-ct-secondary-500/30'
      : tertiary && outline
      ? 'border bg-ct-error-800/30 border-ct-error-500/50 border-2 text-ct-error-800 hover:border-ct-error-500 hover:text-ct-error-500 hover:bg-ct-error-500/30'
      : '';

  return (
    <button
      className={`rounded-lg p-2 shadow-sm transition-all ease-in-out disabled:pointer-events-none disabled:border-gray-400 disabled:opacity-60 ${background} ${outlineColor} ${className}`}
      {...props}
    >
      <Text l1>{children}</Text>
    </button>
  );
};
