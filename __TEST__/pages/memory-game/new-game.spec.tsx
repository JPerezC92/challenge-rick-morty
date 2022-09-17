jest.mock('src/modules/memory-game/hooks/useCharacterRandomListQuery', () => {
  const original = jest.requireActual(
    'src/modules/memory-game/hooks/useCharacterRandomListQuery'
  );
  return {
    ...original,
    __esModule: true,
    useCharacterRandomListQuery: jest
      .fn()
      .mockImplementation(original.useCharacterRandomListQuery),
  };
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as useCharacterRandomListQuery from 'src/modules/memory-game/hooks/useCharacterRandomListQuery';
import NewGamePage from 'src/pages/memory-game/new-game';
import { characterList } from '__TEST__/modules/memory-game/fixtures/characterList.fixture';
import { queryClientWrapper } from '__TEST__/modules/memory-game/fixtures/queryClientWrapper.fixture';

const characterListRefetch = jest.fn();

jest
  .spyOn(useCharacterRandomListQuery, 'useCharacterRandomListQuery')
  .mockReturnValueOnce({
    isLoading: true,
  } as unknown as useCharacterRandomListQuery.UseCharacterListQueryResult)
  .mockReturnValue({
    isLoading: false,
    data: characterList,
    refetch: characterListRefetch,
  } as unknown as useCharacterRandomListQuery.UseCharacterListQueryResult);

describe('Test <NewGamePage />', () => {
  test('should contain a skeleton when is loading', () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should contain a list when the content is loaded', () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('when the game is restarted should call the function characterListRefetch', () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const restartButton = screen.getByRole('button', { name: /restart/i });

    fireEvent.click(restartButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    fireEvent.click(confirmButton);

    expect(characterListRefetch).toHaveBeenCalledTimes(1);
  });

  test('when a card is clicked its name should be displayed', () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const [c1] = characterList;

    const [pairOneCardOne] = screen.getAllByTestId(c1.id);

    fireEvent.click(pairOneCardOne);

    expect(screen.getByText(c1.name)).toBeInTheDocument();
  });

  test('when a second card is clicked its name should be displayed too', () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const [c1, c2] = characterList;

    const [pairOneCardOne] = screen.getAllByTestId(c1.id);
    const [pairTwoCardOne] = screen.getAllByTestId(c2.id);

    fireEvent.click(pairOneCardOne);
    fireEvent.click(pairTwoCardOne);

    expect(screen.getByText(c1.name)).toBeInTheDocument();
    expect(screen.getByText(c2.name)).toBeInTheDocument();
  });

  test('when a move is finished the moves count should be increased', async () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const movesCount = screen.getByTestId('moves-count');
    const [c1, c2] = characterList;

    const [pairOneCardOne] = screen.getAllByTestId(c1.id);
    const [pairTwoCardOne] = screen.getAllByTestId(c2.id);

    fireEvent.click(pairOneCardOne);
    fireEvent.click(pairTwoCardOne);

    await waitFor(() => {
      expect(movesCount).toHaveTextContent(/1/i);
      expect(movesCount).toHaveTextContent(/moves/i);
    });
  });

  test('when a move is finished and is a missmatch the accuracy should not be increased', async () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const accuracy = screen.getByTestId('accuracy');
    const [c1, c2] = characterList;

    const [pairOneCardOne] = screen.getAllByTestId(c1.id);
    const [pairTwoCardOne] = screen.getAllByTestId(c2.id);

    fireEvent.click(pairOneCardOne);
    fireEvent.click(pairTwoCardOne);

    await waitFor(() => {
      expect(accuracy).toHaveTextContent('0');
      expect(accuracy).toHaveTextContent('accuracy');
      expect(accuracy).not.toHaveTextContent('100');
    });
  });

  test('when a move is finished and is a missmatch the accuracy should be increased', async () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const accuracy = screen.getByTestId('accuracy');
    const [c1] = characterList;

    const [pairOneCardOne, pairOneCardTwo] = screen.getAllByTestId(c1.id);

    fireEvent.click(pairOneCardOne);
    fireEvent.click(pairOneCardTwo);

    expect(accuracy).toHaveTextContent('100');
    expect(accuracy).toHaveTextContent('accuracy');
  });

  test('when the game is over should increase the rounds count', async () => {
    render(<NewGamePage />, { wrapper: queryClientWrapper() });

    const movesCount = screen.getByTestId('moves-count');
    const [c1, c2, c3] = characterList;

    const [pairOneCardOne, pairOneCardTwo] = screen.getAllByTestId(c1.id);
    const [pairTwoCardOne, pairTwoCardTwo] = screen.getAllByTestId(c2.id);
    const [pairThreeCardOne, pairThreeCardTwo] = screen.getAllByTestId(c3.id);

    fireEvent.click(pairOneCardOne);
    fireEvent.click(pairOneCardTwo);

    expect(movesCount).toHaveTextContent('1');

    await waitFor(() => expect(pairTwoCardOne).toBeEnabled());

    fireEvent.click(pairTwoCardOne);
    fireEvent.click(pairTwoCardTwo);

    expect(movesCount).toHaveTextContent('2');

    await waitFor(() => expect(pairThreeCardOne).toBeEnabled());

    fireEvent.click(pairThreeCardOne);
    fireEvent.click(pairThreeCardTwo);

    expect(movesCount).toHaveTextContent('3');

    const roundsCount = screen.getByTestId('rounds-count');

    await waitFor(() => expect(roundsCount).toHaveTextContent('1'));
  });
});
