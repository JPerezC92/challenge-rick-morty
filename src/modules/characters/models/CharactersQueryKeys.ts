import { Character } from 'src/modules/characters/models/Character';
import { CharactersListFilters } from 'src/modules/characters/models/CharactersListFilters';

export const CharactersQueryKeys = {
  all: ['Characters'] as const,
  characterListPaginated: (page?: number) =>
    [...CharactersQueryKeys.all, 'CharacterListPaginated', page] as const,
  characterListFilteredPaginated: (filters: CharactersListFilters) =>
    [
      ...CharactersQueryKeys.all,
      'CharacterListFilteredPaginated',
      filters?.name,
      filters?.page,
    ] as const,
  charactersPreviewListFilters: (
    filters: Record<keyof CharactersListFilters, string>
  ) =>
    [
      ...CharactersQueryKeys.all,
      'CharactersPreviewListFilters',
      filters?.page,
      filters?.name,
    ] as const,
  charactersDetails: (id: number) =>
    [...CharactersQueryKeys.all, 'CharactersDetails', id] as const,
  charactersGetMany: (characterIdList: Character['id'][]) =>
    [
      ...CharactersQueryKeys.all,
      'CharactersDetails',
      ...characterIdList,
    ] as const,
};
