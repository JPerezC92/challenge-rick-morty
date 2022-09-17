import {
  act,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryGameMovesCount } from 'src/modules/memory-game/containers/MemoryGameMovesCount';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameMoveIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameMoveIncreaseEvent';

describe('Test <MemoryGameMovesCount />', () => {
  test('initial content should be "0"', () => {
    render(
      <MemoryGameMovesCount moveIncreaseEvent={MemoryGameMoveIncreaseEvent} />
    );

    const movesCount = screen.getByText(/0/i);

    expect(movesCount).toHaveTextContent('0');
  });

  test('when move finished event is triggered should update the MovesCount', async () => {
    render(
      <MemoryGameMovesCount moveIncreaseEvent={MemoryGameMoveIncreaseEvent} />
    );

    const movesCount = screen.getByTestId('moves-count');

    act(() => MemoryGameMoveIncreaseEvent.trigger(1));

    waitFor(() => expect(screen.findByText(/1/i)).toHaveTextContent('1'));
    expect(movesCount).toHaveTextContent('1');

    act(() => MemoryGameMoveIncreaseEvent.trigger(2));

    expect(movesCount).toHaveTextContent('2');
  });
});
