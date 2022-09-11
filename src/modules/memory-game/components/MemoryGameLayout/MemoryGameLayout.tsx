import React from 'react';
import { MemoryGameConfigurationProvider } from 'src/modules/memory-game/context/MemoryGameConfigurationContext';

type MemoryGameLayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export const MemoryGameLayout: React.FC<MemoryGameLayoutProps> = ({
  className = '',
  children,
}) => {
  return (
    <MemoryGameConfigurationProvider>
      <div
        className={`h-full bg-[url('/memory-game-wallpaper.webp')] bg-cover bg-no-repeat ${className}`}
      >
        {children}
      </div>
    </MemoryGameConfigurationProvider>
  );
};
