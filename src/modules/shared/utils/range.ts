export function range(limit: number) {
  return Array(limit)
    .fill('')
    .map((_, i) => i);
}
