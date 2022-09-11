import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CharactersPreviewCard } from 'src/modules/characters/components/CharactersPreviewCard';
import { CharactersPreviewListSkeleton } from 'src/modules/characters/components/CharactersPreviewListSkeleton';
import { useCharacterPreviewQuery } from 'src/modules/characters/hooks/useCharacterPreviewQuery';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { Heading } from 'src/modules/shared/components/Heading';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { Pagination } from 'src/modules/shared/components/Pagination';
import { Text } from 'src/modules/shared/components/Text';
import { usePageQueryString } from 'src/modules/shared/hooks/usePageQueryString';

const Home: NextPage = () => {
  const router = useRouter();
  const pageQueryString = router.query.page as string;

  const { data: page } = usePageQueryString(
    CharactersQueryKeys.charactersPreviewPage(pageQueryString),
    pageQueryString,
    { enabled: router.isReady }
  );

  const {
    data: { characterList: characterPreviewList, pagesCount },
    isLoading: queryIsLoading,
  } = useCharacterPreviewQuery(page, { enabled: !!page });

  const isLoading = queryIsLoading || !characterPreviewList.length;

  const changePage = (page: string | number): void => {
    router.push(
      {
        pathname: CharactersRoutes.rootPath,
        hash: 'characters',
        query: { page: page },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <MainLayout>
      <main className="my-8 px-4">
        <section id="characters" className="mx-auto max-w-7xl">
          <Heading colorGradient="special1" l2>
            Characters
          </Heading>

          <hr className="mt-2 mb-10 border-ct-neutral-ligth-400" />

          <Pagination
            className="mx-auto mb-8 hidden w-max space-x-4 md:ml-auto md:mr-0 md:flex"
            currentPage={page}
            pagesCount={pagesCount}
            onChangePage={changePage}
          />

          {!isLoading ? (
            <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {characterPreviewList?.map((cp) => (
                <li key={cp.id}>
                  <CharactersPreviewCard characterPreview={cp} />
                </li>
              ))}
            </ol>
          ) : (
            <CharactersPreviewListSkeleton
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              items={20}
            />
          )}

          <div className="mt-8 grid items-center gap-4 md:grid-cols-3">
            <Pagination
              className="mx-auto w-max justify-between space-x-4 md:col-span-2 md:col-start-2 md:mr-0 lg:col-start-3"
              currentPage={page}
              pagesCount={pagesCount}
              onChangePage={changePage}
            />

            <Text
              className="mx-auto w-max font-semibold text-ct-neutral-medium-200 md:col-start-1 md:row-start-1 lg:col-start-2 lg:row-start-1"
              as="div"
            >
              Page{' '}
              <Text colorGradient="special1">
                {page} of {pagesCount}
              </Text>
            </Text>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Home;
