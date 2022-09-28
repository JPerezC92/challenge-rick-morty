import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemoryGame:Winner';

export interface MemoryGameWinnerEvent extends CustomEventFactoryResult {}
export const MemoryGameWinnerEvent = CustomEventFactory(type);
