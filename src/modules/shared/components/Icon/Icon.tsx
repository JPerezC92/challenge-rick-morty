import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  className?: string;
  Icon: IconType;
};

export const Icon: React.FC<IconProps> = ({ className = '', Icon }) => {
  return (
    <i className={`inline-block leading-[0] ${className}`}>
      <Icon className="inline-block text-2xl sm:text-3xl" />
    </i>
  );
};
