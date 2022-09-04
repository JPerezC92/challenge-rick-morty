import { CharactersPreviewListSkeleton } from 'src/modules/characters/components/CharactersPreviewListSkeleton';
import { CharactersPreviewList } from 'src/modules/characters/containers/CharactersPreviewList';
import { CharactersPreviewPagination } from 'src/modules/characters/containers/CharactersPreviewPagination';
import { CharactersPreviewPaginationLoaded } from 'src/modules/characters/events/CharactersPaginationPreviewLoaded.event';
import { CharactersPreviewChangePage } from 'src/modules/characters/events/CharactersPreviewChangePage.event';
import { Heading } from 'src/modules/shared/components/Heading';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { NextPageWithLayout } from 'src/pages/_app';

const Home: NextPageWithLayout = () => {
  return (
    <main className="my-8 px-4">
      <Heading colorGradient="special1" l2>
        Characters
      </Heading>

      <hr className="mt-2 mb-8 border-ct-neutral-ligth-400" />

      <CharactersPreviewPagination
        className="mb-4 ml-auto"
        changePageEvent={CharactersPreviewChangePage}
        paginationLoadedEvent={CharactersPreviewPaginationLoaded}
      />

      <CharactersPreviewList
        changePageEvent={CharactersPreviewChangePage}
        paginationLoadedEvent={CharactersPreviewPaginationLoaded}
        skeleton={<CharactersPreviewListSkeleton items={20} />}
      />
    </main>
  );
};

export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
