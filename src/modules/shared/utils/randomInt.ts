export function randomInt(
  max: number,
  min: number = 1,
  noop?: number[]
): number {
  const randomNumber = min + Math.floor(Math.random() * (max - min + 1));

  if (!noop) return randomNumber;

  const args = [
    ...(arguments as unknown as Parameters<typeof randomInt>),
  ] as const;

  if (noop.includes(randomNumber)) {
    return randomInt(...args);
  }

  return randomNumber;
}
