import React from 'react';

type SkeletonProps = {
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-ct-neutral-dark-400 to-ct-neutral-medium-400 ${className}`}
    />
  );
};
