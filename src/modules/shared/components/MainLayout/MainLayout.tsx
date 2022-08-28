import React from 'react';
import { ScrollArea } from 'src/modules/shared/components/ScrollArea';
import { Text } from 'src/modules/shared/components/Text';

type MainLayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  className = '',
  children,
}) => {
  return (
    <ScrollArea className={`bg-ct-neutral-dark-800 ${className}`}>
      {/* <header className="my-4 ">
        <Text className="text-ct-primary-300">dsa</Text>
        <nav>
          <li>das</li>
        </nav>
      </header> */}

      {children}
    </ScrollArea>
  );
};
