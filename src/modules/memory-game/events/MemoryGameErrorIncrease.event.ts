import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

export interface MemoryGameErrorIncreaseEvent
  extends CustomEventFactoryResult<number> {}
export const MemoryGameErrorIncreaseEvent = CustomEventFactory<number>(
  'MemoryGame:ErrorIncrease'
);
