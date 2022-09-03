export function parseIdFromUrl(value: string): number | undefined {
  const idString = value.split('/').at(-1);
  const id = Number(idString);

  if (!id) return;
  return id;
}
