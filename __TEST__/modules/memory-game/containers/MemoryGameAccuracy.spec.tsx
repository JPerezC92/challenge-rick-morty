import { act, render, screen } from '@testing-library/react';
import { MemoryGameAccuracy } from 'src/modules/memory-game/containers/MemoryGameAccuracy';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';

describe('test <MemoryGameAccuracy />', () => {
  test('initial contetnt should be "0"', () => {
    render(
      <MemoryGameAccuracy accuracyChangeEvent={MemoryGameAccuracyChangeEvent} />
    );

    const accuracy = screen.getByText(/0/i);

    expect(accuracy).toHaveTextContent('0');
  });

  test('when the move finished should update the accuracy', async () => {
    render(
      <MemoryGameAccuracy accuracyChangeEvent={MemoryGameAccuracyChangeEvent} />
    );

    act(() => MemoryGameAccuracyChangeEvent.trigger(50));

    const accuracy = await screen.findByText(/50/i);

    expect(accuracy).toHaveTextContent('50');
  });
});
