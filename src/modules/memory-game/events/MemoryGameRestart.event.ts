import { CleanEvent } from 'src/modules/shared/events/CleanEvent';
import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemoryGame:RestartGame';

export interface MemoryGameRestartEvent extends CustomEventFactoryResult {}

export const MemoryGameRestartEvent = CustomEventFactory(type);
