import { useQuery } from '@tanstack/react-query';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { isDefined } from 'src/modules/shared/utils/isDefined';

export function useCharacterQuery(characterId?: number) {
  return useQuery(
    CharactersQueryKeys.charactersDetails(Number(characterId)),
    () => {
      if (!isDefined<number>(characterId)) return;

      const charactersRepository = ApiCharactersRepository();

      const character = charactersRepository.findById(characterId);

      return character;
    },
    { enabled: !!characterId }
  );
}
