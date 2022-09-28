import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemeryGame:AccuracyChange';

export interface MemoryGameAccuracyChangeEvent
  extends CustomEventFactoryResult<Accuracy['value']> {}
export const MemoryGameAccuracyChangeEvent =
  CustomEventFactory<Accuracy['value']>(type);
