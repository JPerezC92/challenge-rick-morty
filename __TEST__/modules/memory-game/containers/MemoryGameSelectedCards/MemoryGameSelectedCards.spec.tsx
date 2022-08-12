import { act, render, screen } from '@testing-library/react';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

const playingCard1 = new PlayingCard({
  boardId: '123',
  id: 1,
  image: 'src',
  name: 'Rick',
});

const playingCard2 = new PlayingCard({
  boardId: '321',
  id: 2,
  image: 'src',
  name: 'Morty',
});

describe('Test MemoryGameSelectedCards', () => {
  test('initial content should be empty', () => {
    render(<MemoryGameSelectedCards />);

    const paragraphList = screen.getAllByRole('paragraph');

    expect(paragraphList.length).toBe(2);
    expect(paragraphList[0]).toHaveTextContent('');
    expect(paragraphList[1]).toHaveTextContent('');
  });

  test('should add one item', async () => {
    render(<MemoryGameSelectedCards />);

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
    });

    const paragraph = await screen.findByText(playingCard1.name);

    expect(paragraph).toHaveTextContent(playingCard1.name);
  });

  test('should add a second item', async () => {
    render(<MemoryGameSelectedCards />);

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
      MemoryGameSelectCardEvent.trigger(playingCard2);
    });

    const paragraph1 = await screen.findByText(playingCard1.name);
    const paragraph2 = await screen.findByText(playingCard2.name);

    expect(paragraph1).toHaveTextContent(playingCard1.name);
    expect(paragraph2).toHaveTextContent(playingCard2.name);
  });

  test('when add a third item should replace the olds state', async () => {
    render(<MemoryGameSelectedCards />);

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
      MemoryGameSelectCardEvent.trigger(playingCard2);
      MemoryGameSelectCardEvent.trigger(playingCard1);
    });

    const paragraphList = screen.getAllByRole('paragraph');

    expect(paragraphList.length).toBe(2);
    expect(paragraphList[0]).toHaveTextContent(playingCard1.name);
    expect(paragraphList[1]).toHaveTextContent('');
  });
});
