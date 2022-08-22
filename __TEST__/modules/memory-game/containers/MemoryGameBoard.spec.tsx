jest.mock('src/modules/memory-game/hooks/useMemoryGame/useMemoryGame', () => {
  const original = jest.requireActual(
    'src/modules/memory-game/hooks/useMemoryGame/useMemoryGame'
  );

  return {
    __esModule: true,
    ...original,
    useMemoryGame: jest
      .fn()
      .mockImplementation(original.useMemoryGame)
      .mockReturnValueOnce({ isGameOver: true }),
  };
});

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { characterList } from '__TEST__/modules/memory-game/fixtures/characterList.fixture';

MemoryGameGameOverEvent.trigger = jest.fn();
MemoryGameMoveFinishedEvent.trigger = jest.fn();
MemoryGameSelectCardEvent.trigger = jest.fn();

describe('Test <MemoryGameBoard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when the game is over should trigger a game over event', async () => {
    render(
      <MemoryGameBoard
        characterList={characterList}
        gameOverEvent={MemoryGameGameOverEvent}
        moveFinishedEvent={MemoryGameMoveFinishedEvent}
        selectCardEvent={MemoryGameSelectCardEvent}
      />
    );

    expect(MemoryGameGameOverEvent.trigger).toHaveBeenCalledTimes(1);
  });

  test('should contain a board with 6 cards', () => {
    render(
      <MemoryGameBoard
        characterList={characterList}
        gameOverEvent={MemoryGameGameOverEvent}
        moveFinishedEvent={MemoryGameMoveFinishedEvent}
        selectCardEvent={MemoryGameSelectCardEvent}
      />
    );

    expect(screen.getAllByRole('button').length).toBe(6);
  });

  test('when a card is clicked should trigger a selected card event', () => {
    render(
      <MemoryGameBoard
        characterList={characterList}
        gameOverEvent={MemoryGameGameOverEvent}
        moveFinishedEvent={MemoryGameMoveFinishedEvent}
        selectCardEvent={MemoryGameSelectCardEvent}
      />
    );

    const firstPair = screen.getAllByTestId(characterList[0].id);

    fireEvent.click(firstPair[0]);

    expect(MemoryGameSelectCardEvent.trigger).toHaveBeenCalledTimes(1);
  });

  test('when two cards are selected should trigger a move finished event', () => {
    render(
      <MemoryGameBoard
        characterList={characterList}
        gameOverEvent={MemoryGameGameOverEvent}
        moveFinishedEvent={MemoryGameMoveFinishedEvent}
        selectCardEvent={MemoryGameSelectCardEvent}
      />
    );

    const firstPair = screen.getAllByTestId(characterList[0].id);

    fireEvent.click(firstPair[0]);
    fireEvent.click(firstPair[1]);

    expect(MemoryGameMoveFinishedEvent.trigger).toHaveBeenCalledTimes(1);
  });
});
