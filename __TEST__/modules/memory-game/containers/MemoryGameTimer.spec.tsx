jest.mock('src/modules/memory-game/models/TimerGame', () => {
  const original = jest.requireActual(
    'src/modules/memory-game/models/TimerGame'
  );
  return { ...original, __esModule: true, TimerGame: { 12: 2, 18: 3, 24: 4 } };
});

import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryGameTimer } from 'src/modules/memory-game/containers/MemoryGameTimer';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { TimerGame } from 'src/modules/memory-game/models/TimerGame';
import { playingCard1 } from '__TEST__/modules/memory-game/fixtures/playingCard.fixture';

const timeout = 1500;

MemoryGameImperativeGameOverEvent.trigger = jest.fn();

describe('Test on <MemoryGameTimer />', () => {
  test('should trigger a imperative game over event when the timer is 0', async () => {
    const boardSize = BoardSize[12];
    const timerValue = TimerGame[boardSize];

    render(
      <MemoryGameTimer
        boardSize={boardSize}
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
    const boardSize = BoardSize[12];
    const timerValue = TimerGame[boardSize];

    render(
      <MemoryGameTimer
        boardSize={boardSize}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
        imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
      />
    );

    expect(screen.getByText(timerValue)).toHaveTextContent(
      timerValue.toString()
    );
  });

  test('should start the timer countdown after a select card event', async () => {
    const boardSize = BoardSize[12];
    const timerValue = TimerGame[boardSize];

    render(
      <MemoryGameTimer
        boardSize={boardSize}
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
    const boardSize = BoardSize[12];
    const timerValue = TimerGame[boardSize];

    render(
      <MemoryGameTimer
        boardSize={boardSize}
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
