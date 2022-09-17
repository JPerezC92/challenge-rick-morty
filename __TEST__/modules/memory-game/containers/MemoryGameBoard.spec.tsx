jest.mock('src/modules/memory-game/hooks/useMemoryGame/useMemoryGame', () => {
  const original = jest.requireActual(
    'src/modules/memory-game/hooks/useMemoryGame/useMemoryGame'
  );

  return {
    ...original,
    __esModule: true,
    useMemoryGame: jest
      .fn()
      .mockImplementation(original.useMemoryGame)
      .mockReturnValueOnce({ isGameOver: true }),
  };
});

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryGameBoard } from 'src/modules/memory-game/containers/MemoryGameBoard';
import { MemoryGameErrorIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameErrorIncrease.event';
import { MemoryGameGameOverEvent } from 'src/modules/memory-game/events/MemoryGameGameOver.event';
import { MemoryGameAccuracyChangeEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { MemoryGameMoveIncreaseEvent } from 'src/modules/memory-game/events/MemoryGameMoveIncreaseEvent';
import { MemoryGameSelectCardEvent } from 'src/modules/memory-game/events/MemoryGameSelectCard.event';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { characterList } from '__TEST__/modules/memory-game/fixtures/characterList.fixture';

MemoryGameGameOverEvent.trigger = jest.fn();
MemoryGameAccuracyChangeEvent.trigger = jest.fn();
MemoryGameSelectCardEvent.trigger = jest.fn();

const memoryGameBoard = () => (
  <MemoryGameBoard
    characterList={characterList}
    accuracyChangeEvent={MemoryGameAccuracyChangeEvent}
    errorIncreaseEvent={MemoryGameErrorIncreaseEvent}
    gameOverEvent={MemoryGameGameOverEvent}
    moveIncreaseEvent={MemoryGameMoveIncreaseEvent}
    selectCardEvent={MemoryGameSelectCardEvent}
    gameMode={GameModes.NORMAL}
  />
);

describe('Test <MemoryGameBoard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when the game is over should trigger a game over event', async () => {
    render(memoryGameBoard());

    expect(MemoryGameGameOverEvent.trigger).toHaveBeenCalledTimes(1);
  });

  test('should contain a board with 6 cards', () => {
    render(memoryGameBoard());

    expect(screen.getAllByRole('button').length).toBe(6);
  });

  test('when a card is clicked should trigger a selected card event', () => {
    render(memoryGameBoard());

    const firstPair = screen.getAllByTestId(characterList[0].id);

    fireEvent.click(firstPair[0]);

    expect(MemoryGameSelectCardEvent.trigger).toHaveBeenCalledTimes(1);
  });

  test('when two cards are selected should trigger a move finished event', () => {
    render(memoryGameBoard());

    const firstPair = screen.getAllByTestId(characterList[0].id);

    fireEvent.click(firstPair[0]);
    fireEvent.click(firstPair[1]);

    expect(MemoryGameAccuracyChangeEvent.trigger).toHaveBeenCalledWith(100);
  });
});
