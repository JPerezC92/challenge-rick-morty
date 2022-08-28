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
    <main className="p-4">
      <Heading
        className="mb-8 bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-transparent"
        l2
      >
        Characters
      </Heading>

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
