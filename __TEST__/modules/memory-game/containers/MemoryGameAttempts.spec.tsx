jest.mock('src/modules/memory-game/models/Attempts', () => {
  const original = jest.requireActual(
    'src/modules/memory-game/models/Attempts'
  );
  return { ...original, __esModule: true, Attempts: { 12: 2, 18: 3, 24: 4 } };
});

import { act, render, screen } from '@testing-library/react';
import { MemoryGameAttempts } from 'src/modules/memory-game/containers/MemoryGameAttempts';
import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameImperativeGameOverEvent } from 'src/modules/memory-game/events/MemoryGameImperativeGameOver.event';
import { Attempts } from 'src/modules/memory-game/models/Attempts';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';

MemoryGameImperativeGameOverEvent.trigger = jest.fn();

const boardSize = BoardSize[12];
const attempts = Attempts[boardSize];

describe('Test on <MemoryGameAttempts />', () => {
  test('the initial render should contain the attempts value', () => {
    render(
      <MemoryGameAttempts
        errorIncrease={MemoryGameErrorIncreaseEvent}
        imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
        boardSize={boardSize}
      />
    );

    expect(screen.getByText(attempts)).toHaveTextContent(attempts.toString());
  });

  test('when a error is triggered the attempts value should be decreased', () => {
    render(
      <MemoryGameAttempts
        errorIncrease={MemoryGameErrorIncreaseEvent}
        imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
        boardSize={boardSize}
      />
    );
    const attemptsComponent = screen.getByText(attempts);

    expect(attemptsComponent).toHaveTextContent(attempts.toString());

    act(() => MemoryGameErrorIncreaseEvent.trigger(1));

    expect(attemptsComponent).toHaveTextContent((attempts - 1).toString());
  });

  test('when the attempts value is equal to 0 should trigger a MemoryGameImperativeGameOverEvent', () => {
    render(
      <MemoryGameAttempts
        errorIncrease={MemoryGameErrorIncreaseEvent}
        imperativeGameOverEvent={MemoryGameImperativeGameOverEvent}
        boardSize={boardSize}
      />
    );
    const attemptsComponent = screen.getByText(attempts);

    expect(MemoryGameImperativeGameOverEvent.trigger).not.toHaveBeenCalled();

    expect(attemptsComponent).toHaveTextContent(attempts.toString());

    act(() => MemoryGameErrorIncreaseEvent.trigger(1));

    expect(MemoryGameImperativeGameOverEvent.trigger).not.toHaveBeenCalled();

    expect(attemptsComponent).toHaveTextContent((attempts - 1).toString());

    act(() => MemoryGameErrorIncreaseEvent.trigger(2));

    expect(attemptsComponent).toHaveTextContent((attempts - 2).toString());

    expect(MemoryGameImperativeGameOverEvent.trigger).toHaveBeenCalledTimes(1);
  });
});
