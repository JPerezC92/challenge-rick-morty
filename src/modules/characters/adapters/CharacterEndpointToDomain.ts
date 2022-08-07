import { CharacterEndpoint } from "src/modules/characters/dto/CharacterEndpoint";
import { Character } from "src/modules/characters/models/Character";

export function CharacterEndpointToDomain(
  characterEndpoint: CharacterEndpoint
): Character {
  return new Character({ ...characterEndpoint });
}
