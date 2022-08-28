import { CharacterEndpoint } from 'src/modules/characters/dto/CharacterEndpoint';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';

export function CharacterEndpointToPreview(
  characterEndpoint: CharacterEndpoint
): CharacterPreview {
  return new CharacterPreview({
    ...characterEndpoint,
    apparitionEpisodes: characterEndpoint.episode.length,
    img: characterEndpoint.image,
    species: characterEndpoint.species,
  });
}
