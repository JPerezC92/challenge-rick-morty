import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { IconButton } from 'src/modules/shared/components/IconButton';
import { Option } from 'src/modules/shared/components/Option';
import { Select } from 'src/modules/shared/components/Select';
import { range } from 'src/modules/shared/utils/range';

type PaginationProps = {
  className?: string;
  pagesCount?: number;
  currentPage: number;
  onChangePage: (page: number | string) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  pagesCount,
  currentPage,
  onChangePage,
}) => {
  return (
    <div
      data-testid="pagination"
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
        className="text-ct-primary-400 outline-ct-neutral-ligth-400"
      >
        {range(pagesCount || currentPage).map((v) => (
          <Option
            key={v}
            value={v + 1}
            className={`outline-ct-neutral-ligth-400 ${
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
