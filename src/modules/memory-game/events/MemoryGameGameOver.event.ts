import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

const type = 'MemoryGame:GameOver';

export const MemoryGameGameOverEvent = {
  trigger: () => {
    const event = new CustomEvent(type);
    window.dispatchEvent(event);
  },
  listener: (fn: () => void): CleanEvent => {
    const listener = (e: Event): void => {
      fn();
    };

    window.addEventListener(type, listener);

    return () => {
      window.removeEventListener(type, listener);
    };
  },
};
