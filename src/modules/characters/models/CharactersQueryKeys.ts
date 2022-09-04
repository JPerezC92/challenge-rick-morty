export const CharactersQueryKeys = {
  all: ['Characters'] as const,
  characterList: (page: number = 1) =>
    [...CharactersQueryKeys.all, 'CharacterList', page] as const,
  charactersPreviewPagination: () =>
    [...CharactersQueryKeys.all, 'CharacterPreviewPagination'] as const,
  charactersDetails: (id: number) =>
    [...CharactersQueryKeys.all, 'CharactersDetails', id] as const,
};