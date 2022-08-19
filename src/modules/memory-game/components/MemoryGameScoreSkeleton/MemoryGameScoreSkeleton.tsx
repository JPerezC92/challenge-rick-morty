import React from 'react';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameScoreSkeletonProps = {
  className?: string;
};

export const MemoryGameScoreSkeleton: React.FC<
  MemoryGameScoreSkeletonProps
> = ({ className = '' }) => {
  return (
    <div
      className={`flex flex-col space-y-1 rounded border border-ct-primary-400 bg-ct-primary-800/50 p-1 text-center text-ct-neutral-ligth-200 sm:p-2 ${className}`}
    >
      <Text
        l1
        className="mx-auto mb-auto h-5 w-full max-w-[5rem] animate-pulse rounded bg-ct-primary-200 sm:h-6"
      />
      <Text
        l2
        className="mx-auto h-4 w-full max-w-[5rem] animate-pulse rounded bg-ct-primary-200 sm:h-5"
      />
    </div>
  );
};
