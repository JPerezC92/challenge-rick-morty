import { act, render, screen } from '@testing-library/react';
import { MemoryGameMovesCount } from 'src/modules/memory-game/containers/MemoryGameMovesCount';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

describe('Test <MemoryGameMovesCount />', () => {
  test('initial content should be "0"', () => {
    render(
      <MemoryGameMovesCount moveFinishedEvent={MemoryGameMoveFinishedEvent} />
    );

    const movesCount = screen.getByText(/0/i);

    expect(movesCount).toHaveTextContent('0');
  });

  test('when the move finished should update the MovesCount', async () => {
    render(
      <MemoryGameMovesCount moveFinishedEvent={MemoryGameMoveFinishedEvent} />
    );

    act(() =>
      MemoryGameMoveFinishedEvent.trigger({ accuracy: 0, movesCount: 2 })
    );

    const movesCount = await screen.findByText(/2/i);

    expect(movesCount).toHaveTextContent('2');
  });
});
