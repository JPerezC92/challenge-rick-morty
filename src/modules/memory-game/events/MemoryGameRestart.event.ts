import { CleanEvent } from 'src/modules/shared/events/CleanEvent';
import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemoryGame:RestartGame';

export const MemoryGameRestartEvent = CustomEventFactory(type);
