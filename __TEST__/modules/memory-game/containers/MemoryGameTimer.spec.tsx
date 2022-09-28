jest.mock('src/modules/memory-game/models/Timer', () => {
  const original = jest.requireActual('src/modules/memory-game/models/Timer');
  return { ...original, __esModule: true, Timer: { 12: 2, 18: 3, 24: 4 } };
});

import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryGameTimer } from 'src/modules/memory-game/containers/MemoryGameTimer';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { Timer } from 'src/modules/memory-game/models/Timer';
import { playingCard1 } from '__TEST__/modules/memory-game/fixtures/playingCard.fixture';

MemoryGameImperativeGameOverEvent.trigger = jest.fn();

const timeout = 1500;
const boardSize = BoardSize[12];

const component = () => (
  <MemoryGameTimer
    boardSize={boardSize}
    gameOverEvent={MemoryGameGameOverEvent}
    selectCardEvent={MemoryGameSelectCardEvent}
    restartEvent={MemoryGameRestartEvent}
    imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
  />
);

describe('Test on <MemoryGameTimer />', () => {
  test('should trigger a imperative game over event when the timer is 0', async () => {
    const timerValue = Timer[boardSize];

    render(component());

    const timerComponent = screen.getByText(timerValue);

    expect(timerComponent).toHaveTextContent(timerValue.toString());

    act(() => MemoryGameSelectCardEvent.trigger([playingCard1]));

    await waitFor(
      () => expect(timerComponent).not.toHaveTextContent(timerValue.toString()),
      { timeout }
    );

    expect(timerComponent).toHaveTextContent((timerValue - 1).toString());

    await waitFor(
      () =>
        expect(timerComponent).not.toHaveTextContent(
          (timerValue - 1).toString()
        ),
      { timeout }
    );

    expect(timerComponent).toHaveTextContent('0');

    expect(MemoryGameImperativeGameOverEvent.trigger).toHaveBeenCalled();
  });

  test('the initial render should contain the timer value', () => {
    const timerValue = Timer[boardSize];

    render(component());

    expect(screen.getByText(timerValue)).toHaveTextContent(
      timerValue.toString()
    );
  });

  test('should start the timer countdown after a select card event', async () => {
    const timerValue = Timer[boardSize];

    render(component());

    const timerComponent = screen.getByText(timerValue);

    expect(timerComponent).toHaveTextContent(timerValue.toString());

    act(() => MemoryGameSelectCardEvent.trigger([playingCard1]));

    await waitFor(
      () => expect(timerComponent).not.toHaveTextContent(timerValue.toString()),
      { timeout }
    );

    expect(timerComponent).toHaveTextContent((timerValue - 1).toString());

    await waitFor(
      () =>
        expect(timerComponent).not.toHaveTextContent(
          (timerValue - 1).toString()
        ),
      { timeout }
    );

    expect(timerComponent).toHaveTextContent('0');
  });

  test('should reset the timer after a restart game event', async () => {
    const timerValue = Timer[boardSize];

    render(
      <MemoryGameTimer
        boardSize={boardSize}
        gameOverEvent={MemoryGameGameOverEvent}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
        imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
      />
    );

    const timerComponent = screen.getByText(timerValue);

    expect(timerComponent).toHaveTextContent(timerValue.toString());

    act(() => MemoryGameSelectCardEvent.trigger([playingCard1]));

    await waitFor(
      () => expect(timerComponent).not.toHaveTextContent(timerValue.toString()),
      { timeout }
    );

    expect(timerComponent).toHaveTextContent((timerValue - 1).toString());

    act(() => MemoryGameRestartEvent.trigger());

    expect(timerComponent).toHaveTextContent(timerValue.toString());
  });
});
