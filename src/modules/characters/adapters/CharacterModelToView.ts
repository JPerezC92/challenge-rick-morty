import { CharacterView } from 'src/modules/characters/dto/CharacterView';
import { Character } from 'src/modules/characters/models/Character';

export function CharacterModelToView(character: Character): CharacterView {
  return {
    id: character.id,
    name: character.name,
    image: character.image,
    species: character.species,
    episodesIdList: character.episodesIdList,
    apparitionEpisodesCount: character.episodesIdList.length,
    status: character.status,
    gender: character.gender,
    type: character.type,
    actualLocation: {
      id: character.actualLocation.id,
      name: character.actualLocation.name,
    },
    originLocation: {
      id: character.originLocation.id,
      name: character.originLocation.name,
    },
  };
}
