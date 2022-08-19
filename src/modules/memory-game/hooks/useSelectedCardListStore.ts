import React from 'react';
import { Board } from 'src/modules/memory-game/models/Board';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

export function useSelectedCardListStore() {
  const [selectedCardList, setSelectedCardList] = React.useState<PlayingCard[]>(
    []
  );

  const selectedCardStore = React.useRef({
    add: (playingCard: PlayingCard) => {
      setSelectedCardList((s) =>
        s.length === Board.maxNumberSelectedCards
          ? [new PlayingCard(playingCard)]
          : [...s, new PlayingCard(playingCard)]
      );
    },

    clean: () => setSelectedCardList([]),
  });

  return { selectedCardList, selectedCardStore: selectedCardStore.current };
}
