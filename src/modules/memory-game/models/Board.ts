import { Character } from 'src/modules/characters/models/Character';
import { shuffleArray } from 'src/modules/shared/utils/shuffleArray';
import { PlayingCard } from './PlayingCard';

export class Board {
  readonly playingCardList: PlayingCard[] = [];
  readonly characterList: Character[] = [];

  constructor({
    playingCardList,
    characterList,
  }: {
    playingCardList: PlayingCard[];
    characterList: Character[];
  }) {
    this.playingCardList = playingCardList;
    this.characterList = characterList;
  }

  public static init(characterList: Character[]): Board {
    const playingCardList = characterList.concat(characterList).map(
      (character, i) =>
        new PlayingCard({
          ...character,
          boardId: character.id.toString() + i,
        })
    );

    return new Board({
      playingCardList: shuffleArray(playingCardList),
      characterList,
    });
  }

  public static maxNumberSelectedCards: number = 2;

  public static canValidateMatch(selectedCardList: PlayingCard[]): boolean {
    return selectedCardList.length === Board.maxNumberSelectedCards;
  }

  public static isMatch(selectedCardList: PlayingCard[]): boolean {
    return selectedCardList[0]?.id === selectedCardList[1]?.id;
  }

  public isGameOver(clearedCardIdList: PlayingCard['id'][]): boolean {
    return this.characterList.length === clearedCardIdList.length;
  }
}