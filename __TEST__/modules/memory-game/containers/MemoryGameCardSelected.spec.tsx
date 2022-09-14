import { act, render, screen } from '@testing-library/react';
import { MemoryGameCardSelected } from 'src/modules/memory-game/containers/MemoryGameCardSelected';
import { MemoryGameRestartEvent } from 'src/modules/memory-game/events/MemoryGameRestart.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import {
  playingCard1,
  playingCard2,
} from '__TEST__/modules/memory-game/fixtures/playingCard.fixture';

describe('Test MemoryGameSelectedCards', () => {
  test('initial content should be empty', () => {
    render(
      <MemoryGameCardSelected
        index={0}
        selectCardEvent={MemoryGameSelectCardEvent}
        restartEvent={MemoryGameRestartEvent}
      />
    );

    const paragraphList = screen.getByRole('paragraph');

    expect(paragraphList).toHaveTextContent('');
  });

  test('should contain the card name', async () => {
    render(
      <>
        <MemoryGameCardSelected
          index={0}
          selectCardEvent={MemoryGameSelectCardEvent}
          restartEvent={MemoryGameRestartEvent}
        />
        <MemoryGameCardSelected
          index={1}
          selectCardEvent={MemoryGameSelectCardEvent}
          restartEvent={MemoryGameRestartEvent}
        />
      </>
    );

    act(() => {
      MemoryGameSelectCardEvent.trigger([playingCard1, playingCard2]);
    });

    const paragraph1 = await screen.findByText(playingCard1.name);
    const paragraph2 = await screen.findByText(playingCard2.name);

    expect(paragraph1).toHaveTextContent(playingCard1.name);
    expect(paragraph2).toHaveTextContent(playingCard2.name);
  });

  test('when the game is restarted should clear the selected cards', async () => {
    render(
      <>
        <MemoryGameCardSelected
          index={0}
          selectCardEvent={MemoryGameSelectCardEvent}
          restartEvent={MemoryGameRestartEvent}
        />
        <MemoryGameCardSelected
          index={1}
          selectCardEvent={MemoryGameSelectCardEvent}
          restartEvent={MemoryGameRestartEvent}
        />
      </>
    );

    act(() => {
      MemoryGameSelectCardEvent.trigger([playingCard1, playingCard2]);
    });

    const paragraph1 = await screen.findByText(playingCard1.name);
    const paragraph2 = await screen.findByText(playingCard2.name);

    expect(paragraph1).toHaveTextContent(playingCard1.name);
    expect(paragraph2).toHaveTextContent(playingCard2.name);

    const paragraphList = screen.getAllByRole('paragraph');

    act(() => {
      MemoryGameRestartEvent.trigger();
    });

    expect(paragraphList.length).toBe(2);
    expect(paragraph1).toHaveTextContent('');
    expect(paragraph2).toHaveTextContent('');
  });
});
