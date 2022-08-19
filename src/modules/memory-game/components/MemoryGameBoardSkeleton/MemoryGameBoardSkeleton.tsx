import React from 'react';

type MemoryGameBoardSkeletonProps = {
  className?: string;
};

export const MemoryGameBoardSkeleton: React.FC<
  MemoryGameBoardSkeletonProps
> = ({ className = '' }) => {
  const id = React.useId();

  return (
    <ul
      className={`grid w-full grid-cols-3 place-content-center gap-4 py-4 px-2 sm:grid-cols-4 lg:grid-cols-6 ${className}`}
    >
      {Array(12)
        .fill('')
        .map((_, i) => (
          <li
            key={id + i}
            className="h-48 w-full animate-pulse rounded-lg border border-ct-neutral-dark-700 bg-ct-primary-300 bg-gradient-to-tl from-ct-primary-400 via-ct-secondary-400/80 to-ct-primary-400 shadow-[0_0_5px_2px] shadow-ct-neutral-dark-700 outline-offset-2 outline-ct-neutral-ligth-400 drop-shadow-lg sm:h-52 md:h-64 xl:h-72 2xl:h-80"
          />
        ))}
    </ul>
  );
};
