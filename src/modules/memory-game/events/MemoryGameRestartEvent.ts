import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

const type = 'MemoryGame:RestartGame';

export const MemoryGameRestartEvent = {
  trigger: () => {
    const event = new CustomEvent(type);
    window.dispatchEvent(event);
  },

  listener: (fn: () => void): CleanEvent => {
    const listener = () => {
      fn();
    };
    window.addEventListener(type, listener);

    return () => {
      window.removeEventListener(type, listener);
    };
  },
};
