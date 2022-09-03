import { isDefined } from './isDefined';

export function isDefinedListItems<T>(value: unknown[]): T[] {
  return value.filter((v) => isDefined(v)) as T[];
}
