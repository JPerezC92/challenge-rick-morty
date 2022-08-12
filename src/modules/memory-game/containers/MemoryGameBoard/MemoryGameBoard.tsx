import React from 'react';
import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { Character } from 'src/modules/characters/models/Character';
import { useMemoryGame } from 'src/modules/memory-game/containers/MemoryGameBoard/useMemoryGame';
import { MemoryGameMoveFinishedEvent } from 'src/modules/memory-game/events/MemoryGameMoveFinished.event';
import { Board } from 'src/modules/memory-game/models/Board';

type MemoryGameBoardProps = {
  className?: string;
  characterList: Character[];
};

export const MemoryGameBoard: React.FC<MemoryGameBoardProps> = ({
  className = '',
  characterList,
}) => {
  const {
    handleClicPlayingCard,
    isGameOver,
    movesCount,
    accuracy,
    playingCardList,
    selectedCardList,
    clearedCardIdList,
  } = useMemoryGame(characterList);

  React.useEffect(() => {
    MemoryGameMoveFinishedEvent.trigger({ movesCount, accuracy });
  }, [accuracy, movesCount]);

  return (
    <ul
      className={`grid h-full grid-cols-3 items-center gap-4 sm:grid-cols-4 ${className}`}
    >
      {playingCardList?.map((playingCard) => (
        <li key={playingCard.boardId}>
          <CharacterCard
            playingCard={playingCard}
            onClick={handleClicPlayingCard}
            disabled={
              Board.canValidateMatch(selectedCardList) ||
              selectedCardList.includes(playingCard) ||
              clearedCardIdList.includes(playingCard.id)
            }
            flip={
              clearedCardIdList.includes(playingCard.id) ||
              selectedCardList.includes(playingCard)
            }
          />
        </li>
      ))}
    </ul>
  );
};
