import { fireEvent, render, screen } from '@testing-library/react';
import * as router from 'next/router';

import { MemoryGameExitButton } from 'src/modules/memory-game/containers/MemoryGameExitButton';

describe('Test <MemoryGameExitButton />', () => {
  test('should contain a button', () => {
    render(<MemoryGameExitButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should call the router.push function when the confirm button is clicked with the correct parameters', () => {
    const push = jest.fn();
    jest
      .spyOn(router, 'useRouter')
      .mockReturnValue({ push } as unknown as router.NextRouter);

    render(<MemoryGameExitButton />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText(/confirm/i));

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/memory-game');
  });
});
