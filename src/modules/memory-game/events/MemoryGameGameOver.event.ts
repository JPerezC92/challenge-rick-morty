import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

const Type = 'MemoryGame:GameOver';

export function Trigger() {
  const event = new CustomEvent(Type);

  window.dispatchEvent(event);
}

export function Listener(fn: () => void): CleanEvent {
  const listener = (e: Event): void => {
    fn();
  };

  window.addEventListener(Type, listener);

  return () => {
    window.removeEventListener(Type, listener);
  };
}
