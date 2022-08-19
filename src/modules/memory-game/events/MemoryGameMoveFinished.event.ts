import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import { Moves } from 'src/modules/memory-game/models/Moves';
import { CustomEventFactory } from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemeryGame:MoveFinished';

interface Detail {
  movesCount: Moves['value'];
  accuracy: Accuracy['value'];
}

export const MemoryGameMoveFinishedEvent = CustomEventFactory<Detail>(type);
