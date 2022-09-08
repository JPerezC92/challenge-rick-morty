export function isDefined<T>(value: unknown): value is T {
  return typeof value !== 'undefined' && !!value;
}
