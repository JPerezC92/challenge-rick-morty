import React from 'react';

type ListProps<T = unknown[]> = {
  className?: string;
  items: T;
  render: React.FC<
    T extends readonly (infer ElementType)[] ? ElementType : never
  >;
};

export const List: React.FC<ListProps> = ({
  className = '',
  items = [],
  render,
}) => {
  return (
    <div className={`${className}`}>{items.map((v, i) => render({ v }))}</div>
  );
};
