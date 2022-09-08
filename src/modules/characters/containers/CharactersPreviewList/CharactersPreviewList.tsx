import React from 'react';
import { CharactersPreviewCard } from 'src/modules/characters/components/CharactersPreviewCard';
import { CharactersPreviewPaginationLoaded } from 'src/modules/characters/events/CharactersPaginationPreviewLoaded.event';
import { CharactersPreviewChangePage } from 'src/modules/characters/events/CharactersPreviewChangePage.event';
import { CharactersPreviewPagesLoadEvent } from 'src/modules/characters/events/CharactersTotalPagesLoad.event';
import { useCharacterPreviewQuery } from 'src/modules/characters/hooks/useCharacterPreviewQuery';

type CharactersPreviewListProps = {
  className?: string;
  changePageEvent: CharactersPreviewChangePage;
  paginationLoadedEvent: CharactersPreviewPaginationLoaded;
  skeleton?: React.ReactElement;
};

export const CharactersPreviewList: React.FC<CharactersPreviewListProps> = ({
  className = '',
  paginationLoadedEvent,
  changePageEvent,
  skeleton,
}) => {
  const [isPaginationLoaded, setIsPaginationLoaded] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const {
    data: { characterList: characterPreviewList, pages },
    isLoading,
  } = useCharacterPreviewQuery(currentPage, { enabled: !isPaginationLoaded });

  React.useEffect(() => {
    if (!pages) return;
    CharactersPreviewPagesLoadEvent.trigger(pages);
  }, [pages]);

  React.useEffect(() => {
    changePageEvent.listener((currentPage) => {
      setCurrentPage(currentPage);
    });
  }, [changePageEvent]);

  React.useEffect(() => {
    const previewPaginationLoadedCleanup = paginationLoadedEvent.listener(() =>
      setIsPaginationLoaded(false)
    );

    return () => {
      previewPaginationLoadedCleanup();
    };
  }, [paginationLoadedEvent]);

  if (skeleton && (isLoading || !characterPreviewList.length)) {
    return skeleton;
  }

  return (
    <ol
      className={`grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ${className}`}
    >
      {characterPreviewList?.map((cp) => (
        <li key={cp.id}>
          <CharactersPreviewCard characterPreview={cp} />
        </li>
      ))}
    </ol>
  );
};
