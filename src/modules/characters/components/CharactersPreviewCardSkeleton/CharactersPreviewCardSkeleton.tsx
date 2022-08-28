import React from 'react';
import { Skeleton } from 'src/modules/shared/components/Skeleton';

type CharactersPreviewCardSkeletonProps = {
  className?: string;
};

export const CharactersPreviewCardSkeleton: React.FC<
  CharactersPreviewCardSkeletonProps
> = ({ className = '' }) => {
  return (
    <div
      className={`$ grid grid-cols-[40%_60%] overflow-hidden rounded-l-full border border-ct-neutral-dark-300 bg-ct-neutral-dark-700/50 shadow shadow-ct-neutral-dark-400 ${className}`}
    >
      <Skeleton />

      <div className="p-4">
        <div className="space-y-1">
          <Skeleton className="h-6 rounded-sm sm:h-7" />

          <Skeleton className="h-[1.125rem] rounded-sm sm:h-5" />
        </div>

        <Skeleton className="my-2 h-[1px]" />

        <div className="space-y-1">
          <Skeleton className="h-5 rounded-sm sm:h-6" />
          <Skeleton className="h-5 rounded-sm sm:h-6" />
        </div>
      </div>
    </div>
  );
};
