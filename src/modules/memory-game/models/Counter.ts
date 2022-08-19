export class Counter {
  constructor(public readonly value: number) {}

  public static init(): Counter {
    return new Counter(0);
  }

  public increment(): Counter {
    return new Counter(this.value + 1);
  }
}
