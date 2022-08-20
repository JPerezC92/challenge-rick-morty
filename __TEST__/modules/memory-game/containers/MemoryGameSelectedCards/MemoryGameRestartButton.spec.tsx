import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryGameRestartButton } from 'src/modules/memory-game/containers/MemoryGameRestartButton';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';

MemoryGameRestartEvent.trigger = jest.fn();

describe('Test <MemoryGameRestartButton />', () => {
  test('should render properly', () => {
    render(<MemoryGameRestartButton restartEvent={MemoryGameRestartEvent} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('when the button is clicked should render a dialog', () => {
    render(<MemoryGameRestartButton restartEvent={MemoryGameRestartEvent} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('when the confirm button is clicked should trigger a restart event', () => {
    render(<MemoryGameRestartButton restartEvent={MemoryGameRestartEvent} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    expect(MemoryGameRestartEvent.trigger).toHaveBeenCalledTimes(1);
  });
});
