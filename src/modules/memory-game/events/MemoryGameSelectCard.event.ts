import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

const type = 'MemeryGame:SelectCard';

export const MemoryGameSelectCardEvent = {
  trigger: (playingCard: PlayingCard) => {
    const event = new CustomEvent<PlayingCard>(type, { detail: playingCard });

    window.dispatchEvent(event);
  },

  listener: (fn: (playingCard: PlayingCard) => void): CleanEvent => {
    const listener = (e: Event): void => {
      const { detail } = e as CustomEvent<PlayingCard>;
      fn(detail);
    };

    window.addEventListener(type, listener);

    return () => window.removeEventListener(type, listener);
  },
};
