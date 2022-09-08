import { CharacterEndpoint } from 'src/modules/characters/dto/CharacterEndpoint';
import { Character } from 'src/modules/characters/models/Character';
import { isDefinedListItems } from 'src/modules/shared/utils/isDefinedListItems';
import { parseIdFromUrl } from 'src/modules/shared/utils/parseIdFromUrl';
import { LocationEndpointToModel } from './LocationEndpointToModel';

export function CharacterEndpointToModel(
  characterEndpoint: CharacterEndpoint
): Character {
  return new Character({
    ...characterEndpoint,
    actualLocation: LocationEndpointToModel(characterEndpoint.location),
    originLocation: LocationEndpointToModel(characterEndpoint.origin),
    episodesIdList: isDefinedListItems<number>(
      characterEndpoint.episode.map(parseIdFromUrl)
    ),
  });
}
