import React from 'react';

type ButtonProps =
  | {} & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`rounded border-2 border-teal-400 px-4 py-2 hover:bg-teal-200/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
