import { motion } from 'framer-motion';
import React from 'react';
import { useConfigurationQuery } from 'src/modules/memory-game/hooks/useConfigurationQuery';
import { ScrollArea } from 'src/modules/shared/components/ScrollArea';

type MemoryGameLayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export const MemoryGameLayout: React.FC<MemoryGameLayoutProps> = ({
  className = '',
  children,
}) => {
  useConfigurationQuery();

  return (
    <>
      <ScrollArea
        className={`bg-[url('/memory-game-wallpaper.webp')] bg-cover bg-no-repeat ${className}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </ScrollArea>
    </>
  );
};
