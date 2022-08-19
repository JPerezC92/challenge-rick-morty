import { CleanEvent } from 'src/modules/shared/events/CleanEvent';

export const CustomEventFactory = <Detail extends unknown = void>(
  type: string
) => {
  return {
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
};
