import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { MemoryGameRoutes } from 'src/modules/memory-game/models/routes';
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
      <header className="sticky top-0 z-10 grid grid-cols-1 bg-ct-neutral-ligth-400/50 py-2 px-4 shadow-md shadow-ct-neutral-ligth-400 backdrop-blur-md">
        <picture className="relative w-48 md:w-64">
          <Image
            src="/logo.png"
            layout="responsive"
            className=""
            alt="logo"
            width={3274}
            height={1043}
          />
        </picture>

        {/* <nav>
          {[
            { name: 'Characters', value: CharactersRoutes.rootPath },
            { name: 'Memory game', value: MemoryGameRoutes.rootPath },
          ].map((route) => (
            <li key={route.name}>
              <Link href={route.value}>
                <Text
                  as="a"
                  className="font-bold text-ct-neutral-dark-50"
                  href={route.value}
                  l1
                >
                  {route.name}
                </Text>
              </Link>
            </li>
          ))}
        </nav> */}
      </header>

      {children}
    </ScrollArea>
  );
};
