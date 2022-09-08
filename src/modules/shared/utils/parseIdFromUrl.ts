export function parseIdFromUrl(value: string): number | null {
  const idString = value.split('/').at(-1);
  const id = Number(idString);

  if (!id) return null;
  return id;
}
