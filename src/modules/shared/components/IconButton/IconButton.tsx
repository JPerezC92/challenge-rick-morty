import React from 'react';
import { IconType } from 'react-icons';
import { Icon } from 'src/modules/shared/components/Icon/Icon';

type IconButtonProps = {
  icon: IconType;
} & React.ComponentProps<'button'>;

export const IconButton: React.FC<IconButtonProps> = ({
  className = '',
  icon,
  ...props
}) => {
  return (
    <button
      className={`rounded-md p-2 leading-[0] disabled:border-gray-400 disabled:opacity-60 ${className}`}
      {...props}
    >
      <Icon as={icon} />
    </button>
  );
};
