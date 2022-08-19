import { Accuracy } from 'src/modules/memory-game/models/Accuracy';
import { Moves } from 'src/modules/memory-game/models/Moves';
import {
  CustomEventFactory,
  CustomEventFactoryResult,
} from 'src/modules/shared/events/CustomEventFactory';

const type = 'MemeryGame:MoveFinished';

interface Detail {
  movesCount: Moves['value'];
  accuracy: Accuracy['value'];
}

export interface MemoryGameMoveFinishedEvent
  extends CustomEventFactoryResult<Detail> {}

export const MemoryGameMoveFinishedEvent = CustomEventFactory<Detail>(type);
