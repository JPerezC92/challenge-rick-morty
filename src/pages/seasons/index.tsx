import Image from 'next/image';
import Link from 'next/link';
import { SeasonsRoutes } from 'src/modules/seasons/models/routes';
import { Heading } from 'src/modules/shared/components/Heading';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { NextPageWithLayout } from 'src/pages/_app';

const SeasonsPage: NextPageWithLayout = () => {
  return (
    <main className="mx-auto my-8 max-w-7xl px-4">
      <Heading l2 as="h1" colorGradient="special1">
        Seasons
      </Heading>

      <hr className="mt-2 mb-8 border-ct-neutral-ligth-400" />

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,14rem),1fr))_] gap-4">
        {[
          { id: 's01', value: 'Season 1' },
          { id: 's02', value: 'Season 2' },
          { id: 's03', value: 'Season 3' },
          { id: 's04', value: 'Season 4' },
          { id: 's05', value: 'Season 5' },
        ].map((v) => (
          <li key={v.id}>
            <article className="overflow-hidden rounded-md border border-ct-neutral-medium-300 bg-ct-neutral-dark-600 shadow-[0_0_7px_2px] shadow-ct-neutral-medium-400">
              <header className="my-1 md:my-2">
                <Link href={SeasonsRoutes.seasonsId(v.id)}>
                  <Heading
                    as="a"
                    card
                    className="block text-center"
                    colorGradient="special1"
                  >
                    {v.value}
                  </Heading>
                </Link>
              </header>

              <hr className="border-ct-neutral-medium-300" />

              <Link href={SeasonsRoutes.seasonsId(v.id)}>
                <a>
                  <picture className="relative block">
                    <Image
                      src={`/seasons/${v.id}.webp`}
                      alt={v.value}
                      layout="responsive"
                      width={12}
                      height={15}
                      className="object-cover object-top"
                      priority
                    />
                  </picture>
                </a>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
};

SeasonsPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default SeasonsPage;
