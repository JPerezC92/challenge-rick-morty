import { useQuery } from '@tanstack/react-query';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';

interface CharacterListQueryProps {
  characterIdList: number[];
  enabled?: boolean;
}

export function useCharacterListQuery({
  characterIdList,
  enabled,
}: CharacterListQueryProps) {
  return useQuery(
    CharactersQueryKeys.charactersGetMany(characterIdList),
    async ({ signal }) => {
      const charactersRepository = ApiCharactersRepository(signal);

      const characterList = await charactersRepository.findManyById({
        characterIdList,
      });

      return characterList;
    },
    { enabled }
  );
}
