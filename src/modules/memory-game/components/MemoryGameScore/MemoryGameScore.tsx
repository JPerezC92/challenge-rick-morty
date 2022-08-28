import React from 'react';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameScoreProps = {
  className?: string;
  desc: string;
  value?: number | string;
} & React.ComponentProps<'div'>;

export const MemoryGameScore: React.FC<MemoryGameScoreProps> = ({
  className = '',
  desc,
  value,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col rounded border border-ct-primary-400 bg-ct-primary-800/50 p-1 text-center text-ct-special-ligth-200 sm:p-2 ${className}`}
      {...props}
    >
      <Text l1 className="scale-150">
        {value}
      </Text>
      <Text l2 className="capitalize">
        {desc}
      </Text>
    </div>
  );
};
