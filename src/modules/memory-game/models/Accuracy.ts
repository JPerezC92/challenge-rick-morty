import { Moves } from './Moves';

export class Accuracy {
  constructor(public readonly value: number) {}

  static init(): Accuracy {
    return new Accuracy(0);
  }

  calculate(props: {
    movesCount: Moves;
    clearedCardQuantity: number;
  }): Accuracy {
    if (props.movesCount.value <= 0) return Accuracy.init();

    return new Accuracy(
      Number(
        (
          ((props.clearedCardQuantity / 2) * 100) /
          props.movesCount.value
        ).toFixed(1)
      )
    );
  }
}
