import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GiPortal } from 'react-icons/gi';
import { CharactersEpisodesPreviewList } from 'src/modules/characters/containers/CharactersEpisodesPreviewList';
import { useCharacterQuery } from 'src/modules/characters/hooks/useCharacterQuery';
import { Status } from 'src/modules/characters/models/Status';
import { Heading } from 'src/modules/shared/components/Heading';
import { Icon } from 'src/modules/shared/components/Icon';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { Text } from 'src/modules/shared/components/Text';

const CharacterDetailsPage: NextPage = () => {
  const { query } = useRouter();
  const { data } = useCharacterQuery(Number(query.characterId as string));

  const dasdasdas = `lg:grid-rows-[repeat(${Math.ceil(
    data?.episodesIdList.length || 2 / 2
  )},minmax(0,1fr))]`;

  if (!data) return <>...Loading</>;

  return (
    <MainLayout>
      <main className="grid max-w-full overflow-ellipsis p-4 md:mx-auto md:max-w-7xl">
        <header className={`mx-auto mt-2 mb-16 w-full`}>
          <Heading
            l2
            className={`rounded-2xl border-y-2 bg-gradient-to-r from-ct-secondary-400 to-ct-primary-400 bg-clip-text py-4 text-center text-transparent  ${
              data.status === Status.ALIVE
                ? 'border-ct-primary-300 from-ct-secondary-300 to-ct-primary-300'
                : data.status === Status.DEAD
                ? 'border-ct-error-300 from-ct-error-300 to-ct-neutral-dark-300'
                : data.status === Status.UNKNOWN
                ? 'border-ct-neutral-dark-300 from-ct-neutral-dark-300 to-ct-neutral-ligth-300'
                : ''
            }`}
          >
            {data.name}
          </Heading>
        </header>

        <section className="mb-8 grid gap-8 md:mx-auto md:w-full md:grid-cols-[min(40%_,_22rem)_auto] md:gap-4 lg:grid-cols-[min(45%_,_25rem)_auto] lg:gap-8">
          <picture className="relative m-auto block w-1/2 overflow-hidden rounded-md border-2 border-ct-special-ligth-200/90 md:m-0 md:mb-auto md:w-full">
            <Image
              src={data.image}
              alt={data.name}
              className="object-cover"
              height={300}
              width={300}
              layout="responsive"
              priority
            />
          </picture>

          <div className="self-end">
            <Heading l3 as="h2" className="mb-4 text-ct-secondary-400 md:mb-8">
              About
            </Heading>

            <ul className="divide-y divide-dotted divide-ct-neutral-ligth-400/50 border-y border-ct-neutral-ligth-400 md:mb-0">
              {[
                { label: 'gender', value: data.gender },
                { label: 'species', value: data.species },
                { label: 'status', value: data.status },
                { label: 'type', value: data.type },
                { label: 'Origin location', value: data.originLocation.name },
                {
                  label: 'Last known location',
                  value: data.actualLocation.name,
                },
              ].map((v) => (
                <li key={v.label} className="text-ct-special-ligth-100">
                  <p className="grid grid-cols-[auto_auto_1fr] items-center py-1">
                    <Icon
                      as={GiPortal}
                      variant="xs"
                      className="ml-2 -mr-1 -scale-75 mix-blend-luminosity"
                    />

                    <Text
                      as="span"
                      className="inline-flex items-center rounded py-1 px-2 font-extrabold capitalize tracking-widest"
                      l1
                    >
                      {v.label}:
                    </Text>

                    <Text
                      as="span"
                      className="w-full text-right font-medium md:tracking-wider"
                      l1
                    >
                      {v.value || '?'}
                    </Text>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <Heading
            l3
            as="h2"
            className="mb-4 tracking-wider text-ct-secondary-400"
          >
            Episodes
          </Heading>

          <CharactersEpisodesPreviewList
            episodeIdList={data.episodesIdList}
            className="sm:columns-[20rem] lg:columns-[30rem]"
          />
        </section>
      </main>
    </MainLayout>
  );
};

export default CharacterDetailsPage;
