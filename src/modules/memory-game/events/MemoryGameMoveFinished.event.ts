import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import { Moves } from 'src/modules/memory-game/models/Moves';
import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

const type = 'MemeryGame:MoveFinished';

interface Detail {
  movesCount: Moves['value'];
  accuracy: Accuracy['value'];
}

export const MemoryGameMoveFinishedEvent = {
  trigger: (detail: Detail) => {
    const event = new CustomEvent<Detail>(type, { detail });

    window.dispatchEvent(event);
  },

  listener: (fn: (detail: Detail) => void): CleanEvent => {
    const listener = (e: Event): void => {
      const { detail } = e as CustomEvent<Detail>;
      fn(detail);
    };

    window.addEventListener(type, listener);

    return () => window.removeEventListener(type, listener);
  },
};
