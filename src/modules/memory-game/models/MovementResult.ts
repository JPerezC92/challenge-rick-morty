export class MovementResult {
  constructor(public readonly value: boolean) {}

  public static isMovementResult(other: unknown): other is MovementResult {
    return other instanceof MovementResult;
  }
}
