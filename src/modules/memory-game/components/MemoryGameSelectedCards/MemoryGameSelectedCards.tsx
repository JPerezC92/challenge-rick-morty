import React from 'react';
import { TbPlayCard } from 'react-icons/tb';
import { MemoryGameCardSelected } from 'src/modules/memory-game/containers/MemoryGameCardSelected';

import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { Icon } from 'src/modules/shared/components/Icon';
import { Text } from 'src/modules/shared/components/Text';

// export const CardSelected: React.FC<{
//   selectCardEvent: MemoryGameSelectCardEvent;
//   restartEvent: MemoryGameRestartEvent;
//   index: 0 | 1;
// }> = ({ index, restartEvent, selectCardEvent }) => {
//   const [playingCard, setPlayingCard] = React.useState<PlayingCard | null>(
//     null
//   );

//   React.useEffect(() => {
//     const selectCardCleanup = selectCardEvent.listener((playingCardList) => {
//       const playingCard = playingCardList[index];
//       if (!playingCard) return;

//       setPlayingCard(playingCard);
//     });

//     const restartCleanup = restartEvent.listener(() => {
//       setPlayingCard(null);
//     });

//     return () => {
//       selectCardCleanup();
//       restartCleanup();
//     };
//   }, [index, restartEvent, selectCardEvent]);

//   return (
//     <Text
//       l1
//       as="div"
//       className="inline-flex items-center justify-center gap-x-1 truncate text-ct-primary-300"
//     >
//       <Icon
//         as={TbPlayCard}
//         className={` ${!!playingCard ? 'visible' : 'invisible'}`}
//       />

//       <p className="truncate" role="paragraph">
//         {playingCard?.name}
//       </p>
//     </Text>
//   );
// };

type MemoryGameSelectedCardsProps = {
  className?: string;
  selectCardEvent: MemoryGameSelectCardEvent;
  restartEvent: MemoryGameRestartEvent;
};

export const MemoryGameSelectedCards: React.FC<
  MemoryGameSelectedCardsProps
> = ({ className = '' }) => {
  return (
    <header
      className={`grid grid-cols-[1fr_auto_1fr] border border-ct-error-200 bg-gradient-to-r from-ct-secondary-700/90 via-ct-error-800/90 to-ct-secondary-700/90 p-2 shadow-sm shadow-ct-error-500 sm:p-3 md:rounded-b-2xl ${className}`}
    >
      <MemoryGameCardSelected
        index={0}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />

      <hr className="mx-1 h-full border-l-2 border-ct-secondary-400" />

      <MemoryGameCardSelected
        index={1}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    </header>
  );
};
