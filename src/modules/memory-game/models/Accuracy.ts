import { Counter } from 'src/modules/memory-game/models/Counter';

export class Accuracy {
  constructor(public readonly value: number) {}

  static init(): Accuracy {
    return new Accuracy(0);
  }

  public static calculate(props: {
    movesCount: Counter;
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
