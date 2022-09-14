import React from 'react';
import { ScrollArea } from 'src/modules/shared/components/ScrollArea';

type MemoryGameBoardOverlayProps = {
  className?: string;
  topBar?: React.ReactElement;
  board: React.ReactElement;
  bottomBar?: React.ReactElement;
};

export const MemoryGameBoardOverlay: React.FC<MemoryGameBoardOverlayProps> = ({
  className = '',
  board,
  bottomBar,
  topBar,
}) => {
  return (
    <>
      <div className={`grid h-full grid-rows-[auto_1fr_auto] ${className}`}>
        {topBar}
        {board}
        {bottomBar}
      </div>
    </>
  );
};
