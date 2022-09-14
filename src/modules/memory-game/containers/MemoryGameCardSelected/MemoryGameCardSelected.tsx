import React from 'react';
import { TbPlayCard } from 'react-icons/tb';

import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { Icon } from 'src/modules/shared/components/Icon';
import { Text } from 'src/modules/shared/components/Text';

type MemoryGameCardSelectedProps = {
  className?: string;
  selectCardEvent: MemoryGameSelectCardEvent;
  restartEvent: MemoryGameRestartEvent;
  index: 0 | 1;
};

export const MemoryGameCardSelected: React.FC<MemoryGameCardSelectedProps> = ({
  index,
  restartEvent,
  selectCardEvent,
}) => {
  const [playingCard, setPlayingCard] = React.useState<PlayingCard | null>(
    null
  );

  React.useEffect(() => {
    const selectCardCleanup = selectCardEvent.listener((playingCardList) => {
      const playingCard = playingCardList[index];
      if (!playingCard) return;

      setPlayingCard(playingCard);
    });

    const restartCleanup = restartEvent.listener(() => {
      setPlayingCard(null);
    });

    return () => {
      selectCardCleanup();
      restartCleanup();
    };
  }, [index, restartEvent, selectCardEvent]);

  return (
    <Text
      l1
      as="div"
      className="inline-flex items-center justify-center gap-x-1 truncate text-ct-primary-300"
    >
      <Icon
        as={TbPlayCard}
        className={` ${!!playingCard ? 'visible' : 'invisible'}`}
      />

      <p className="truncate" role="paragraph">
        {playingCard?.name}
      </p>
    </Text>
  );
};
