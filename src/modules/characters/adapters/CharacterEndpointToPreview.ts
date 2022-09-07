import { CharacterEndpoint } from 'src/modules/characters/dto/CharacterEndpoint';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Character } from 'src/modules/characters/models/Character';

export function CharacterEndpointToPreview(
  characterEndpoint: CharacterEndpoint
): CharacterPreview {
  return {
    id: characterEndpoint.id,
    name: characterEndpoint.name,
    status: characterEndpoint.status,
    apparitionEpisodes: characterEndpoint.episode.length,
    image: characterEndpoint.image,
    species: characterEndpoint.species,
  };
}

export function CharacterModelToPreview(
  character: Character
): CharacterPreview {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    species: character.species,
    apparitionEpisodes: character.episodesIdList.length,
    status: character.status,
  };
}
