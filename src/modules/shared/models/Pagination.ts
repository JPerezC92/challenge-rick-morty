export class Pagination {
  constructor(public readonly value: number, public readonly total?: number) {}

  public static init(): Pagination {
    return new Pagination(1);
  }

  public previous(): Pagination | undefined {
    if (this.value === 1) return;

    return new Pagination(this.value - 1, this.total);
  }

  public next(): Pagination | undefined {
    if (!this.total || this.value === this.total) return;

    return new Pagination(this.value + 1, this.total);
  }
}
