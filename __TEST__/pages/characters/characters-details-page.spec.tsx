import { render, screen, within } from '@testing-library/react';
import CharacterDetailsPage from 'src/pages/characters/[characterId]';
import { characterView } from './fixtures/characterView';

describe('Test on <CharacterDetailsPage />', () => {
  test('should contain an h1 with the character name', () => {
    render(<CharacterDetailsPage characterView={characterView} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      characterView.name
    );
  });

  test('should contain two h2 with the proper text', () => {
    render(<CharacterDetailsPage characterView={characterView} />);

    const [t1, t2] = screen.getAllByRole('heading', { level: 2 });

    expect(t1).toHaveTextContent(/about/i);
    expect(t2).toHaveTextContent(/episodes/i);
  });

  test('should contain two h2 with the proper text', () => {
    render(<CharacterDetailsPage characterView={characterView} />);

    expect(screen.getByAltText(characterView.name)).toBeInTheDocument();
  });

  test('should contain an about data list with the correct items length', () => {
    render(<CharacterDetailsPage characterView={characterView} />);

    const aboutDataList = screen.getByTestId('about-data-list');

    expect(within(aboutDataList).getAllByRole('listitem')).toHaveLength(6);
  });

  test('should contain an episode list with the correct items length', () => {
    render(<CharacterDetailsPage characterView={characterView} />);

    const episodeList = screen.getByTestId('episodes-list');

    expect(within(episodeList).getAllByRole('listitem')).toHaveLength(2);
  });
});
