import { Character } from 'src/modules/characters/models/Character';

export const characterList = [
  {
    id: 184,
    name: 'Jon',
    image: 'https://rickandmortyapi.com/api/character/avatar/184.jpeg',
  },
  {
    id: 206,
    name: 'Lizard Morty',
    image: 'https://rickandmortyapi.com/api/character/avatar/206.jpeg',
  },
  {
    id: 292,
    name: 'Rick K-22',
    image: 'https://rickandmortyapi.com/api/character/avatar/292.jpeg',
  },
].map((v) => new Character(v));
