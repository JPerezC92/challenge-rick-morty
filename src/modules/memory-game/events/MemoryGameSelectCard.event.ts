import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemeryGame:SelectCard';
export interface MemoryGameSelectCardEvent
  extends CustomEventFactoryResult<PlayingCard[]> {}

export const MemoryGameSelectCardEvent: MemoryGameSelectCardEvent =
  CustomEventFactory<PlayingCard[]>(type);
