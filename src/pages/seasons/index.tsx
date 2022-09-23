import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SeasonsRoutes } from 'src/modules/seasons/models/routes';
import { SeasonList } from 'src/modules/seasons/models/SeasonList';
import { Heading } from 'src/modules/shared/components/Heading';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { rgbDataURL } from 'src/modules/shared/utils/rgbDataURL';

const SeasonsPage: NextPage = () => {
  return (
    <MainLayout>
      <main className="mx-auto my-8 max-w-7xl px-4">
        <Heading l2 as="h1" colorGradient="special1">
          Seasons
        </Heading>

        <hr className="mt-2 mb-8 border-ct-neutral-ligth-400" />

        <ul
          data-testid="seasons-list"
          className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,14rem),1fr))_] gap-4"
        >
          {SeasonList.map((v) => (
            <li key={v.id}>
              <article className="rounded-md border border-ct-neutral-medium-300 bg-ct-neutral-dark-600 shadow-[0_0_7px_2px] shadow-ct-neutral-medium-400">
                <header className="my-1 md:my-2">
                  <Link href={SeasonsRoutes.seasonsId(v.id)}>
                    <Heading
                      as="a"
                      card
                      className="block text-center outline-ct-neutral-ligth-400"
                      colorGradient="special1"
                    >
                      {v.value}
                    </Heading>
                  </Link>
                </header>

                <hr className="border-ct-neutral-medium-300" />

                <Link href={SeasonsRoutes.seasonsId(v.id)}>
                  <a className="outline-offset-2 outline-ct-neutral-ligth-400">
                    <picture className="relative block">
                      <Image
                        alt={v.value}
                        blurDataURL={rgbDataURL(54, 56, 123)}
                        className="object-cover object-top"
                        height={150}
                        width={120}
                        layout="responsive"
                        placeholder="blur"
                        priority
                        quality={50}
                        src={`/seasons/${v.id}.webp`}
                      />
                    </picture>
                  </a>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </MainLayout>
  );
};

export default SeasonsPage;
