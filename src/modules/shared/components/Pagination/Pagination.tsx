import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { IconButton } from 'src/modules/shared/components/IconButton';
import { Option } from 'src/modules/shared/components/Option';
import { Select } from 'src/modules/shared/components/Select';
import { Skeleton } from 'src/modules/shared/components/Skeleton';
import { range } from 'src/modules/shared/utils/range';

type PaginationProps = {
  className?: string;
  pagesCount?: number;
  currentPage?: number;
  onChangePage: (page: number | string) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  pagesCount,
  currentPage,
  onChangePage,
}) => {
  if (!currentPage)
    return (
      <div
        className={`flex w-max items-center rounded-md border border-ct-neutral-dark-400 p-2 ${className}`}
      >
        <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
        <Skeleton className="h-10 w-[7.875rem] rounded-sm sm:h-[2.875rem] sm:w-[8.75rem]" />
        <Skeleton className="h-10 w-10 rounded-sm sm:h-[2.875rem] sm:w-[2.875rem]" />
      </div>
    );

  return (
    <div
      className={`rounded-md border border-ct-neutral-dark-400 p-2 ${className}`}
    >
      <IconButton
        className=" bg-ct-neutral-medium-700 text-ct-neutral-ligth-300"
        disabled={!(currentPage > 1)}
        onClick={() => onChangePage(currentPage - 1)}
        icon={MdNavigateBefore}
      />

      <Select
        value={currentPage.toString()}
        onChange={onChangePage}
        className="text-ct-primary-400"
      >
        {range(pagesCount || currentPage).map((v) => (
          <Option
            key={v}
            value={v + 1}
            className={`${
              currentPage === v + 1
                ? 'bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-transparent'
                : 'text-ct-neutral-medium-100'
            }`}
          >
            Page {v + 1}
          </Option>
        ))}
      </Select>

      <IconButton
        className="bg-ct-neutral-medium-700 text-ct-neutral-ligth-300"
        disabled={!(!!pagesCount && currentPage < pagesCount)}
        onClick={() => onChangePage(currentPage + 1)}
        icon={MdNavigateNext}
      />
    </div>
  );
};
