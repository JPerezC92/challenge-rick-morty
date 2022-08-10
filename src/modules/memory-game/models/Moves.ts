export class Moves {
  constructor(public readonly value: number) {}

  static init(): Moves {
    return new Moves(0);
  }

  increment(): Moves {
    return new Moves(this.value + 1);
  }
}
