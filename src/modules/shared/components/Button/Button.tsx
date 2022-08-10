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
      ? 'border border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/5'
      : tertiary && outline
      ? 'border border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-500/5'
      : '';

  return (
    <button
      className={`rounded p-2 shadow-sm transition-all ease-in-out disabled:pointer-events-none disabled:border-gray-400 disabled:opacity-60 ${background} ${outlineColor} ${className}`}
      {...props}
    >
      <Text l1>{children}</Text>
    </button>
  );
};
