import { act, render, screen } from '@testing-library/react';
import { MemoryGameSelectedCards } from 'src/modules/memory-game/containers/MemoryGameSelectedCards';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import {
  playingCard1,
  playingCard2,
} from '__TEST__/modules/memory-game/fixtures/playingCard.fixture';

describe('Test MemoryGameSelectedCards', () => {
  test('initial content should be empty', () => {
    render(
      <MemoryGameSelectedCards
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

    const paragraphList = screen.getAllByRole('paragraph');

    expect(paragraphList.length).toBe(2);
    expect(paragraphList[0]).toHaveTextContent('');
    expect(paragraphList[1]).toHaveTextContent('');
  });

  test('should add one item', async () => {
    render(
      <MemoryGameSelectedCards
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
    });

    const paragraph = await screen.findByText(playingCard1.name);

    expect(paragraph).toHaveTextContent(playingCard1.name);
  });

  test('should add a second item', async () => {
    render(
      <MemoryGameSelectedCards
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
      MemoryGameSelectCardEvent.trigger(playingCard2);
    });

    const paragraph1 = await screen.findByText(playingCard1.name);
    const paragraph2 = await screen.findByText(playingCard2.name);

    expect(paragraph1).toHaveTextContent(playingCard1.name);
    expect(paragraph2).toHaveTextContent(playingCard2.name);
  });

  test('when add a third item should replace the previous selections', async () => {
    render(
      <MemoryGameSelectedCards
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

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

  test('when the game is restarted should clear the selected cards', async () => {
    render(
      <MemoryGameSelectedCards
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

    act(() => {
      MemoryGameSelectCardEvent.trigger(playingCard1);
      MemoryGameSelectCardEvent.trigger(playingCard2);
    });

    const paragraphList = screen.getAllByRole('paragraph');

    act(() => {
      MemoryGameRestartEvent.trigger();
    });

    expect(paragraphList.length).toBe(2);
    expect(paragraphList[0]).toHaveTextContent('');
    expect(paragraphList[1]).toHaveTextContent('');
  });
});
