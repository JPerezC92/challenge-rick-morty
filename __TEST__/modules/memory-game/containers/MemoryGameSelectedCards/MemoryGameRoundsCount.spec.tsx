import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryGameRoundsCount } from 'src/modules/memory-game/containers/MemoryGameRoundsCount';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';

function queryClientWrapper(): React.FC<{ children: React.ReactElement }> {
  const queryClient = new QueryClient();

  return function QueryClientWrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

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

  test('initial content should be "0"', async () => {
    render(<MemoryGameRoundsCount gameOverEvent={MemoryGameGameOverEvent} />, {
      wrapper: queryClientWrapper(),
    });

    const rounds = await screen.findByText(/0/i);

    expect(rounds).toHaveTextContent('0');

    act(() => MemoryGameGameOverEvent.trigger());

    await waitFor(() => screen.getByText(/1/i));

    // console.log(prettyDOM(rounds));

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
