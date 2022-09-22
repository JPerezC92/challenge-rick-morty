import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { CharacterSearcher } from 'src/modules/characters/containers/CharacterSearcher';
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
  const [navToggle, setNavToggle] = React.useState(false);
  const [searchToggle, setSearchToggle] = React.useState(false);

  return (
    <ScrollArea className={`bg-ct-neutral-dark-800 ${className}`}>
      <header className="sticky top-0 z-10 grid grid-cols-[1fr_auto_auto] items-center bg-ct-neutral-ligth-400/50 py-2 px-4 shadow-md shadow-ct-neutral-ligth-400 backdrop-blur-md">
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

        {navToggle && (
          <hr className="col-span-3 mt-2 mb-4 border-ct-neutral-ligth-400 md:hidden" />
        )}

        <nav
          className={`col-span-3 transition-transform md:visible md:col-span-1 md:col-start-2 md:row-start-1 md:h-auto md:scale-100 ${
            navToggle
              ? 'visible h-auto scale-y-100 opacity-100'
              : 'invisible h-1 scale-y-0 opacity-0 md:opacity-100'
          } ${searchToggle ? 'opacity-0' : 'opacity-1'}`}
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
                    className="block rounded-xl px-2 py-1 text-center font-bold text-ct-special-ligth-100 outline-ct-neutral-ligth-400 transition-all duration-100 hover:bg-ct-neutral-ligth-800/80 hover:text-ct-special-ligth-300 md:px-3"
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

        <IconButton
          icon={FiSearch}
          className="col-start-2 row-start-1 text-ct-neutral-ligth-100 hover:saturate-200 md:col-start-3"
          onClick={() => {
            setSearchToggle((s) => !s);
            setNavToggle(false);
          }}
        />

        <IconButton
          icon={navToggle ? MdOutlineClose : FaHamburger}
          className="col-start-3 row-start-1 text-ct-neutral-ligth-100 hover:saturate-200 md:hidden"
          onClick={() => setNavToggle((s) => !s)}
        />

        <div
          className={`absolute inset-0 flex items-center bg-ct-neutral-ligth-400 transition-all duration-150 ease-in-out md:my-3 md:ml-auto md:max-w-md md:rounded-l  ${
            searchToggle
              ? 'scale-y-100'
              : '-top-full scale-y-0 md:top-0 md:-right-full md:scale-y-100 md:scale-x-0'
          }`}
        >
          {searchToggle && (
            <CharacterSearcher
              className="px-4"
              onSearch={() => setSearchToggle((s) => !s)}
            />
          )}
        </div>
      </header>

      {children}
    </ScrollArea>
  );
};
