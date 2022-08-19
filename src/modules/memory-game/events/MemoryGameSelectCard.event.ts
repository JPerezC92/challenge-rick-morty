import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';
import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemeryGame:SelectCard';

export const MemoryGameSelectCardEvent = CustomEventFactory<PlayingCard>(type);
