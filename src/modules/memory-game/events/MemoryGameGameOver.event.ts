import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemoryGame:GameOver';

export interface MemoryGameGameOverEvent extends CustomEventFactoryResult {}
export const MemoryGameGameOverEvent = CustomEventFactory(type);
