import { randomInt } from './randomInt';

export function randomUniqueIntArray(props: {
  length: number;
  max: number;
  min?: number;
  noop?: readonly number[];
}): number[] {
  const { length, max, min = 1, noop = [] } = props;

  const randomNumber = randomInt(max, min, noop);

  if (length <= 1) return Array(1).fill(randomNumber) as number[];

  const arr = Array(1).fill(randomInt(max, min, noop)) as number[];

  const set = new Set(arr);

  if (set.size === length) return arr;

  const repeatedNumbersCount = length - set.size;
  const setToArray = Array.from(set);

  return [
    ...setToArray,
    ...randomUniqueIntArray({
      length: repeatedNumbersCount,
      max,
      min,
      noop: [...setToArray, ...noop],
    }),
  ];
}
