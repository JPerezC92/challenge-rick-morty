import { CharacterEndpoint } from 'src/modules/characters/dto/CharacterEndpoint';
import { Character } from 'src/modules/characters/models/Character';
import { isDefinedListItems } from 'src/modules/shared/utils/isDefinedListItems';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';
import { LocationEndpointToDomain } from './LocationEndpointToDomain';

export function CharacterEndpointToDomain(
  characterEndpoint: CharacterEndpoint
): Character {
  return new Character({
    ...characterEndpoint,
    actualLocation: LocationEndpointToDomain(characterEndpoint.location),
    originLocation: LocationEndpointToDomain(characterEndpoint.origin),
    episodesIdList: isDefinedListItems<number>(
      characterEndpoint.episode.map(parseIdFromUrl)
    ),
  });
}
