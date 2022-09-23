import { render, screen, within } from '@testing-library/react';
import SeasonsPage from 'src/pages/seasons';

describe('first', () => {
  test('should contain a heading with the title seasons', () => {
    render(<SeasonsPage />);

    expect(screen.getByRole('heading')).toHaveTextContent(/seasons/i);
  });

  test('should contain a list with 5 items', () => {
    render(<SeasonsPage />);

    const seasonsList = screen.getByTestId('seasons-list');

    expect(within(seasonsList).getAllByRole('listitem')).toHaveLength(5);
  });

  test('each season should contain an image', () => {
    render(<SeasonsPage />);

    const seasonsList = screen.getByTestId('seasons-list');

    expect(within(seasonsList).getAllByRole('img')).toHaveLength(5);
  });
});
