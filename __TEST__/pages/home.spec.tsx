jest.mock('next/router', () => {
  const original = jest.requireActual('next/router');
  return {
    ...original,
    __esModule: true,
    useRouter: jest.fn().mockImplementation(original.useRouter),
  };
});

jest.mock('src/modules/shared/hooks/useCharacterFiltersQueryString', () => {
  const original = jest.requireActual(
    'src/modules/shared/hooks/useCharacterFiltersQueryString'
  );
  return {
    ...original,
    __esModule: true,
    useCharacterFiltersQueryString: jest
      .fn()
      .mockImplementation(original.useCharacterFiltersQueryString),
  };
});

jest.mock('src/modules/characters/hooks/useCharacterPreviewQuery', () => {
  const original = jest.requireActual(
    'src/modules/characters/hooks/useCharacterPreviewQuery'
  );
  return {
    ...original,
    __esModule: true,
    useCharacterPreviewQuery: jest
      .fn()
      .mockImplementation(original.useCharacterPreviewQuery),
  };
});

jest.mock('src/modules/characters/hooks/useCharacterPreviewFilterQuery', () => {
  const original = jest.requireActual(
    'src/modules/characters/hooks/useCharacterPreviewFilterQuery'
  );
  return {
    ...original,
    __esModule: true,
    useCharacterPreviewFilterQuery: jest
      .fn()
      .mockImplementation(original.useCharacterPreviewFilterQuery),
  };
});

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import * as Router from 'next/router';
import { CharacterModelToView } from 'src/modules/characters/adapters/CharacterModelToView';
import * as useCharacterPreviewFilterQuery from 'src/modules/characters/hooks/useCharacterPreviewFilterQuery';
import * as useCharacterPreviewQuery from 'src/modules/characters/hooks/useCharacterPreviewQuery';
import { useCharacterFiltersQueryString } from 'src/modules/shared/hooks/useCharacterFiltersQueryString';
import Home from 'src/pages';
import { characterList } from '__TEST__/modules/memory-game/fixtures/characterList.fixture';
import { queryClientWrapper } from '__TEST__/modules/memory-game/fixtures/queryClientWrapper.fixture';

describe('Test on <Home />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('the initial render should contain a skeleton', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: false,
    } as unknown as Router.NextRouter);

    render(<Home />, { wrapper: queryClientWrapper() });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should contain the main layout', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<Home />, { wrapper: queryClientWrapper() });

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  test('should contain a heading', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValue({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    const charactersHeading = screen.getByRole('heading', { level: 1 });

    expect(charactersHeading).toHaveTextContent(/characters/i);
  });

  test('should render the pagination components', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValue({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    expect(useCharacterFiltersQueryString).toHaveBeenCalledTimes(1);

    const paginationComponentList = await screen.findAllByTestId('pagination');

    const [paginationComponent1, paginationComponent2] =
      paginationComponentList;

    await waitFor(() => expect(paginationComponentList).toHaveLength(2));

    expect(paginationComponent1).toHaveTextContent(/page 1/i);
    expect(paginationComponent2).toHaveTextContent(/page 1/i);
  });

  test('FilterQuery: should render the pagination components', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1', name: 'Rick' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewFilterQuery, 'useCharacterPreviewFilterQuery')
      .mockReturnValue({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewFilterQuery.UseCharacterPreviewFilterQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    expect(useCharacterFiltersQueryString).toHaveBeenCalledTimes(1);

    const paginationComponentList = await screen.findAllByTestId('pagination');

    const [paginationComponent1, paginationComponent2] =
      paginationComponentList;

    await waitFor(() => expect(paginationComponentList).toHaveLength(2));

    expect(paginationComponent1).toHaveTextContent(/page 1/i);
    expect(paginationComponent2).toHaveTextContent(/page 1/i);
  });

  test('should render the pagination count', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValueOnce({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    const paginationCount = await screen.findByTestId('pagination-counter');

    await waitFor(() =>
      expect(paginationCount).toHaveTextContent(/page 1 of 42/i)
    );
  });

  test('FilterQuery: should render the pagination count', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1', name: 'Rick' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewFilterQuery, 'useCharacterPreviewFilterQuery')
      .mockReturnValueOnce({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewFilterQuery.UseCharacterPreviewFilterQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    const paginationCount = await screen.findByTestId('pagination-counter');

    await waitFor(() =>
      expect(paginationCount).toHaveTextContent(/page 1 of 42/i)
    );
  });

  test('should render the character preview card skeleton', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    await waitFor(() =>
      expect(
        screen.getByTestId('character-preview-skeleton')
      ).toBeInTheDocument()
    );
  });

  test('FilterQuery:should render the character preview card skeleton', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewFilterQuery, 'useCharacterPreviewFilterQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as useCharacterPreviewFilterQuery.UseCharacterPreviewFilterQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    await waitFor(() =>
      expect(
        screen.getByTestId('character-preview-skeleton')
      ).toBeInTheDocument()
    );
  });

  test('should render the character preview card components', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValue({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    const characterPreviewList = await screen.findByTestId(
      'character-preview-list'
    );

    const charactersImgList = within(characterPreviewList).getAllByRole('img');

    expect(charactersImgList).toHaveLength(characterList.length);
  });

  test('FilterQuery: should render the character preview card components', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '4', name: 'Rick' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewFilterQuery, 'useCharacterPreviewFilterQuery')
      .mockReturnValue({
        data: {
          characterList: characterList.map(CharacterModelToView),
          pagesCount: 42,
        },
        isLoading: false,
        isError: false,
      } as unknown as useCharacterPreviewFilterQuery.UseCharacterPreviewFilterQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    expect(useCharacterFiltersQueryString).toHaveBeenCalledTimes(1);

    await waitFor(() =>
      expect(screen.getByTestId('character-preview-list')).toBeInTheDocument()
    );

    const characterPreviewList = await screen.findByTestId(
      'character-preview-list'
    );

    const charactersImgList = within(characterPreviewList).getAllByRole('img');

    expect(charactersImgList).toHaveLength(characterList.length);
  });

  test('should render a error message when the query result is an error', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '1' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewQuery, 'useCharacterPreviewQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as useCharacterPreviewQuery.UseCharacterPreviewQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    const errorMessagge = await screen.findByText(/problem/i);

    expect(errorMessagge).toHaveTextContent(
      /There was a problem retrieving the characters/i
    );
  });

  test('FilterQuery: should render a error message when the query has 0 results', async () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { page: '4', name: 'Rick' },
      isReady: true,
    } as unknown as Router.NextRouter);

    jest
      .spyOn(useCharacterPreviewFilterQuery, 'useCharacterPreviewFilterQuery')
      .mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as useCharacterPreviewFilterQuery.UseCharacterPreviewFilterQueryResult);

    render(<Home />, { wrapper: queryClientWrapper() });

    const errorMessagge = await screen.findByText(/0 results/i);

    expect(errorMessagge).toHaveTextContent(
      /There was 0 results for this search/i
    );
  });
});
