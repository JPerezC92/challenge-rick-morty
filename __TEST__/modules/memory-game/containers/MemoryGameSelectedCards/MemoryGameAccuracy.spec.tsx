import { act, render, screen } from '@testing-library/react';
import { MemoryGameAccuracy } from 'src/modules/memory-game/containers/MemoryGameAccuracy';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

describe('test <MemoryGameAccuracy />', () => {
  test('initial contetnt should be "0"', () => {
    render(
      <MemoryGameAccuracy moveFinishedEvent={MemoryGameMoveFinishedEvent} />
    );

    const accuracy = screen.getByText(/0/i);

    expect(accuracy).toHaveTextContent('0');
  });

  test('when the move finished should update the accuracy', async () => {
    render(
      <MemoryGameAccuracy moveFinishedEvent={MemoryGameMoveFinishedEvent} />
    );

    act(() =>
      MemoryGameMoveFinishedEvent.trigger({ movesCount: 0, accuracy: 50 })
    );

    const accuracy = await screen.findByText(/50/i);

    expect(accuracy).toHaveTextContent('50');
  });
});
