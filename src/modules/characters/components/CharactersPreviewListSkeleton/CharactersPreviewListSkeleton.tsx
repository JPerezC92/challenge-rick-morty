import React from 'react';
import { CharactersPreviewCardSkeleton } from 'src/modules/characters/components/CharactersPreviewCardSkeleton';
import { range } from 'src/modules/shared/utils/range';

type CharactersPreviewListSkeletonProps = {
  className?: string;
  items: number;
};

export const CharactersPreviewListSkeleton: React.FC<
  CharactersPreviewListSkeletonProps
> = ({ className = '', items }) => {
  const id = React.useId();

  return (
    <div className={`${className}`}>
      {range(items).map((v) => (
        <CharactersPreviewCardSkeleton key={id + v} />
      ))}
    </div>
  );
};
