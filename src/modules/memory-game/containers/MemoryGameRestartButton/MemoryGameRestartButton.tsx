import React from 'react';

type MemoryGameRestartButtonProps = {
  className?: string
};

export const MemoryGameRestartButton: React.FC<MemoryGameRestartButtonProps> = ({className=""}) => {
    return <div className={`${className}`} > 
      <h1>MemoryGameRestartButton</h1>
       </div> ;
};
