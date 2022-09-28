jest.mock('next/router', () => {
  const original = jest.requireActual('next/router');
  return {
    ...original,
    __esModule: true,
    useRouter: jest.fn().mockImplementation(original.useRouter),
  };
});

import { render, screen, within } from '@testing-library/react';
import * as Router from 'next/router';
import { SeasonList } from 'src/modules/seasons/models/SeasonList';
import SeasonDetailsPage from 'src/pages/seasons/[seasonId]';
import { episodelist } from './fixture/episodelist';

const episodeCode = episodelist[0].code;
const seasonId = SeasonList[0].id;

describe('Test on <SeasonDetailsPage />', () => {
  test('should contain a skeleton if isFallback is true', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: true,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should contain a skeleton if isReady is false', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: false,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should contain a h1 with the proper text', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SeasonList[0].value
    );
  });

  test('should contain an accordion', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  test('accordion should contain 3 items', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    const accordion = screen.getByTestId('accordion');

    const accordionItemList =
      within(accordion).getAllByTestId('accordion-item');

    expect(accordionItemList).toHaveLength(3);
  });

  test('accordion item should contain a heading', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    const accordion = screen.getByTestId('accordion');

    const [accordionItem1] = within(accordion).getAllByTestId('accordion-item');

    expect(
      within(accordionItem1).getByRole('heading', { level: 2 })
    ).toBeInTheDocument();
  });

  test('accordion item should contain a list with the characters images', () => {
    jest.spyOn(Router, 'useRouter').mockReturnValue({
      query: { episodeCode, seasonId },
      isFallback: false,
      isReady: true,
    } as unknown as Router.NextRouter);

    render(<SeasonDetailsPage episodeList={episodelist} />);

    const accordion = screen.getByTestId('accordion');

    const [accordionItem1] = within(accordion).getAllByTestId('accordion-item');
    const [episode1] = episodelist;

    expect(within(accordionItem1).getAllByRole('img')).toHaveLength(
      episode1.characterViewList.length
    );
  });
});
