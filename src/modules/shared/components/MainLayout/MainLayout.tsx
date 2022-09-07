import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { MemoryGameRoutes } from 'src/modules/memory-game/models/routes';
import { SeasonsRoutes } from 'src/modules/seasons/models/routes';
import { IconButton } from 'src/modules/shared/components/IconButton';
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
  const [toggle, setToggle] = React.useState(false);

  return (
    <ScrollArea className={`bg-ct-neutral-dark-800 ${className}`}>
      <header className="sticky top-0 z-10 grid grid-cols-[1fr_auto] items-center bg-ct-neutral-ligth-400/50 py-2 px-4 shadow-md shadow-ct-neutral-ligth-400 backdrop-blur-md">
        <picture className="relative w-48 md:w-64">
          <Image
            src="/logo.png"
            layout="responsive"
            className=""
            alt="Rick & Morty logo"
            priority
            width={3274}
            height={1043}
          />
        </picture>

        <IconButton
          icon={toggle ? MdOutlineClose : FaHamburger}
          className="text-ct-neutral-ligth-100 hover:saturate-200 md:hidden"
          onClick={() => setToggle((s) => !s)}
        />

        {toggle && (
          <hr className="col-span-2 mt-2 mb-4 border-ct-neutral-ligth-400 md:hidden" />
        )}

        <nav
          className={`col-span-2 md:visible md:col-span-1 md:h-auto md:scale-100 ${
            toggle ? 'visible' : 'invisible h-0 scale-0'
          }`}
        >
          <ol className="gap-y-1 gap-x-3 space-y-1 md:flex md:space-y-0">
            {[
              { name: 'Characters', value: CharactersRoutes.rootPath },
              { name: 'Seasons', value: SeasonsRoutes.rootPath },
              { name: 'Memory game', value: MemoryGameRoutes.rootPath },
            ].map((route) => (
              <li key={route.name}>
                <Link href={route.value}>
                  <Text
                    as="a"
                    className="block rounded-xl px-2 py-1 text-center font-bold text-ct-special-ligth-100 transition-all duration-100 hover:bg-ct-neutral-ligth-800/80 hover:text-ct-special-ligth-300 md:px-3"
                    href={route.value}
                    l1
                  >
                    {route.name}
                  </Text>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {children}
    </ScrollArea>
  );
};
