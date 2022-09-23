import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CharactersPreviewCard } from 'src/modules/characters/components/CharactersPreviewCard';
import { CharactersPreviewListSkeleton } from 'src/modules/characters/components/CharactersPreviewListSkeleton';
import { useCharacterPreviewFilterQuery } from 'src/modules/characters/hooks/useCharacterPreviewFilterQuery';
import { useCharacterPreviewQuery } from 'src/modules/characters/hooks/useCharacterPreviewQuery';
import { CharactersListFilters } from 'src/modules/characters/models/CharactersListFilters';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { Heading } from 'src/modules/shared/components/Heading';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { Pagination } from 'src/modules/shared/components/Pagination';
import { PaginationSkeleton } from 'src/modules/shared/components/PaginationSkeleton';
import { Text } from 'src/modules/shared/components/Text';
import { useCharacterFiltersQueryString } from 'src/modules/shared/hooks/useCharacterFiltersQueryString';

const Home: NextPage = () => {
  const router = useRouter();
  const pageQueryString = router.query.page as string;
  const nameQueryString = router.query.name as string;
  const pagesCountQueryString = router.query['pages-count'] as string;

  const { data: filters, isLoading: filtersIsLoading } =
    useCharacterFiltersQueryString(
      CharactersQueryKeys.charactersPreviewListFilters({
        page: pageQueryString,
        name: nameQueryString,
      }),
      { pageQueryString, nameQueryString },
      { enabled: router.isReady }
    );

  const isFilterQuery = !!filters?.name && !!filters?.page;
  const isSimpleQuery = !!filters?.page && !filters?.name;

  const {
    data: previewQuery,
    isLoading: previewQueryIsLoading,
    isError: previewQueryIsError,
  } = useCharacterPreviewQuery(filters?.page, {
    enabled: isSimpleQuery,
  });

  const {
    data: previewFilteredQuery,
    isLoading: previewFilteredQueryIsLoading,
    isError: previewFilteredQueryIsError,
  } = useCharacterPreviewFilterQuery(filters as CharactersListFilters, {
    enabled: isFilterQuery,
  });

  const isError = previewQueryIsError || previewFilteredQueryIsError;

  const pagesCount =
    (isFilterQuery
      ? previewFilteredQuery?.pagesCount
      : previewQuery?.pagesCount) || Number(pagesCountQueryString);

  const characterPreviewList = isFilterQuery
    ? previewFilteredQuery?.characterList
    : previewQuery?.characterList;

  const isLoading =
    (!characterPreviewList && previewQueryIsLoading) ||
    (!characterPreviewList && previewFilteredQueryIsLoading);

  const changePage = (page: string | number): void => {
    let query = {} as Record<string, string | number>;
    if (filters?.name) query.name = filters.name;
    if (page) query.page = page;
    if (pagesCount) query['pages-count'] = pagesCount;

    router.push(
      { pathname: CharactersRoutes.rootPath, hash: 'characters', query },
      undefined,
      { shallow: true }
    );
  };

  return (
    <MainLayout>
      <main className="my-8 px-4">
        <section id="characters" className="mx-auto max-w-7xl ">
          <Heading colorGradient="special1" l2>
            Characters
          </Heading>

          <hr className="mt-2 mb-10 border-ct-neutral-ligth-400" />

          {filtersIsLoading || !filters?.page ? (
            <PaginationSkeleton className="mx-auto mb-8 hidden w-max space-x-4 md:ml-auto md:mr-0 md:flex" />
          ) : (
            <Pagination
              className={`mx-auto mb-8 hidden w-max space-x-4 md:ml-auto md:mr-0 md:flex ${
                isError ? 'invisible' : ''
              }`}
              currentPage={filters.page}
              pagesCount={pagesCount}
              onChangePage={changePage}
            />
          )}

          {isError ? (
            <Text
              l1
              as="div"
              variant="ALL_CAPS"
              className="mx-auto text-center text-ct-special-ligth-400"
            >
              {isFilterQuery ? (
                <>
                  There was 0 results for this search:{' '}
                  <Text className="text-ct-secondary-400">{filters?.name}</Text>
                </>
              ) : (
                'There was a problem retrieving the characters'
              )}
            </Text>
          ) : isLoading ? (
            <CharactersPreviewListSkeleton
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              items={20}
            />
          ) : (
            <ol
              data-testid="character-preview-list"
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {characterPreviewList?.map((characterPreview) => (
                <li key={characterPreview.id}>
                  <CharactersPreviewCard characterPreview={characterPreview} />
                </li>
              ))}
            </ol>
          )}

          <div className="mt-8 grid items-center gap-4 md:grid-cols-3">
            {filtersIsLoading || !filters?.page ? (
              <PaginationSkeleton className="mx-auto w-max justify-between space-x-4 md:col-span-2 md:col-start-2 md:mr-0 lg:col-start-3" />
            ) : (
              <Pagination
                className={`mx-auto w-max justify-between space-x-4 md:col-span-2 md:col-start-2 md:mr-0 lg:col-start-3 ${
                  isError ? 'invisible' : ''
                }`}
                currentPage={filters.page}
                pagesCount={pagesCount}
                onChangePage={changePage}
              />
            )}

            <Text
              data-testid="pagination-counter"
              className={`mx-auto w-max font-semibold text-ct-neutral-medium-200 md:col-start-1 md:row-start-1 lg:col-start-2 lg:row-start-1 ${
                isError ? 'invisible' : ''
              }`}
              as="div"
            >
              Page{' '}
              <Text colorGradient="special1">
                {filters?.page} of {pagesCount || pagesCountQueryString}
              </Text>
            </Text>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Home;
