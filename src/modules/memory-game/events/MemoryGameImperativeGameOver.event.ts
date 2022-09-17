import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

export interface MemoryGameImperativeGameOverEvent
  extends CustomEventFactoryResult {}
export const MemoryGameImperativeGameOverEvent = CustomEventFactory(
  'MemoryGame:ImperativeGameOver'
);
