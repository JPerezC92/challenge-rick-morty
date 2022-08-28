import React from 'react';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { IconButton } from 'src/modules/shared/components/IconButton';
import { Option } from 'src/modules/shared/components/Option';
import { Select } from 'src/modules/shared/components/Select';
import { range } from 'src/modules/shared/utils/range';

type PaginationProps = {
  className?: string;
  pages?: number;
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onChangePage: (page: number | string) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  className = '',
  pages,
  currentPage,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onChangePage,
}) => {
  return (
    <div
      className={`w-max space-x-3 rounded-md border border-ct-neutral-dark-400 p-2 ${className}`}
    >
      <IconButton
        className=" bg-ct-neutral-medium-700 text-ct-neutral-ligth-300"
        disabled={!hasPrevious}
        onClick={onPrevious}
        icon={MdNavigateBefore}
      />

      <Select value={currentPage.toString()} onChange={onChangePage}>
        {range(pages || currentPage).map((v) => (
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
        disabled={!hasNext}
        onClick={onNext}
        icon={MdNavigateNext}
      />
    </div>
  );
};
