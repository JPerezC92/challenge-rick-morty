import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryGameRoundsCount } from 'src/modules/memory-game/containers/MemoryGameRoundsCount';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { queryClientWrapper } from '__TEST__/modules/memory-game/fixtures/queryClientWrapper.fixture';

LocalStorageService.setItem = jest.fn();
LocalStorageService.getItem = jest
  .fn()
  .mockReturnValue(4)
  .mockReturnValueOnce(0)
  .mockReturnValueOnce(0)
  .mockReturnValueOnce(0);

describe('Test <MemoryGameRoundsCount />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initial content should be "0"', async () => {
    render(<MemoryGameRoundsCount gameOverEvent={MemoryGameGameOverEvent} />, {
      wrapper: queryClientWrapper(),
    });

    const rounds = await screen.findByText(/0/i);

    expect(rounds).toHaveTextContent('0');
    expect(LocalStorageService.getItem).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.getItem).toHaveBeenCalledWith(
      MemoryGameLSKeys.RoundsCount
    );
  });

  test('when a game over event is triggered the count of rounds should be increased', async () => {
    render(<MemoryGameRoundsCount gameOverEvent={MemoryGameGameOverEvent} />, {
      wrapper: queryClientWrapper(),
    });

    const rounds = await screen.findByText(/0/i);

    expect(rounds).toHaveTextContent('0');

    act(() => MemoryGameGameOverEvent.trigger());

    await waitFor(() => screen.getByText(/1/i));

    expect(rounds).toHaveTextContent('1');
    expect(LocalStorageService.setItem).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.setItem).toHaveBeenCalledWith(
      MemoryGameLSKeys.RoundsCount,
      '1'
    );
    expect(LocalStorageService.getItem).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.getItem).toHaveBeenCalledWith(
      MemoryGameLSKeys.RoundsCount
    );
  });
});
