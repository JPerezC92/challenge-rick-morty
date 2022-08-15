export function randomInt(
  max: number,
  min: number = 1,
  noop?: readonly number[]
): number {
  const randomNumber = min + Math.floor(Math.random() * (max - min + 1));

  if (!noop || noop.length === 0) return randomNumber;

  const args = [
    ...(arguments as unknown as Parameters<typeof randomInt>),
  ] as const;

  if (noop.includes(randomNumber)) {
    return randomInt(...args);
  }

  return randomNumber;
}
