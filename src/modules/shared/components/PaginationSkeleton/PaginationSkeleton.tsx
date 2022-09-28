import React from 'react';
import { Skeleton } from 'src/modules/shared/components/Skeleton';

type PaginationSkeletonProps = {
  className?: string;
};

export const PaginationSkeleton: React.FC<PaginationSkeletonProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex w-max items-center rounded-md border border-ct-neutral-dark-400 p-2 ${className}`}
    >
      <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
      <Skeleton className="h-10 w-[7.875rem] rounded-sm sm:h-[2.875rem] sm:w-[8.75rem]" />
      <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
    </div>
  );
};
