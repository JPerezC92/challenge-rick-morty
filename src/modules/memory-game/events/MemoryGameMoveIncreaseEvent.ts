import { Counter } from 'src/modules/memory-game/models/Counter';
import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

export interface MemoryGameMoveIncreaseEvent
  extends CustomEventFactoryResult<Counter['value']> {}

export const MemoryGameMoveIncreaseEvent: MemoryGameMoveIncreaseEvent =
  CustomEventFactory<Counter['value']>('MemoryGame:MovesIncrease');
