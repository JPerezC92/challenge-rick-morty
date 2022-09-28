import React from 'react';
import { CharactersPreviewCardSkeleton } from 'src/modules/characters/components/CharactersPreviewCardSkeleton';
import { range } from 'src/modules/shared/utils/range';

type CharactersPreviewListSkeletonProps = {
  items: number;
} & React.ComponentProps<'div'>;

export const CharactersPreviewListSkeleton: React.FC<
  CharactersPreviewListSkeletonProps
> = ({ items, ...props }) => {
  const id = React.useId();

  return (
    <div {...props}>
      {range(items).map((v) => (
        <CharactersPreviewCardSkeleton key={id + v} />
      ))}
    </div>
  );
};
