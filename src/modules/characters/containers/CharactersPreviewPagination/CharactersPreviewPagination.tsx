import React from 'react';
import { CharactersPreviewPaginationLoaded } from 'src/modules/characters/events/CharactersPaginationPreviewLoaded.event';
import { CharactersPreviewChangePage } from 'src/modules/characters/events/CharactersPreviewChangePage.event';
import { useCharactersPreviewPagination } from 'src/modules/characters/hooks/useCharactersPreviewPagination';
import { Pagination } from 'src/modules/shared/components/Pagination';
import { Skeleton } from 'src/modules/shared/components/Skeleton';

type CharactersPreviewPaginationProps = {
  className?: string;
  changePageEvent: CharactersPreviewChangePage;
  paginationLoadedEvent: CharactersPreviewPaginationLoaded;
};

export const CharactersPreviewPagination: React.FC<
  CharactersPreviewPaginationProps
> = ({ className = '', changePageEvent, paginationLoadedEvent }) => {
  const {
    isLoading,
    currentPage,
    previousPage,
    pages,
    nextPage,
    paginationStore,
  } = useCharactersPreviewPagination();

  React.useEffect(() => {
    if (isLoading) return;

    paginationLoadedEvent.trigger();
  }, [isLoading, paginationLoadedEvent]);

  React.useEffect(() => {
    changePageEvent.trigger(currentPage);
  }, [changePageEvent, currentPage]);

  if (isLoading)
    return (
      <div
        className={`flex w-max space-x-3 rounded-md border border-ct-neutral-dark-400 p-2 ${className}`}
      >
        <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
        <Skeleton className="h-10 w-[7.25rem] rounded-sm sm:h-[2.875rem] sm:w-[8.125rem]" />
        <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
      </div>
    );

  return (
    <Pagination
      className={`${className}`}
      pages={pages}
      currentPage={currentPage}
      hasNext={!!nextPage}
      hasPrevious={!!previousPage}
      onNext={paginationStore.nextPage}
      onPrevious={paginationStore.previousPage}
      onChangePage={paginationStore.changePage}
    />
  );
};
