import { CharacterEndpointToDomain } from 'src/modules/characters/adapters/CharacterEndpointToDomain';
import { Status } from 'src/modules/characters/models/Status';

export const characterList = [
  {
    id: 362,
    name: 'Traflorkian',
    status: Status.ALIVE,
    species: 'Alien',
    type: 'Traflorkian',
    gender: 'unknown',
    origin: { name: 'unknown', url: '' },
    location: {
      name: "Worldender's lair",
      url: 'https://rickandmortyapi.com/api/location/4',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/362.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/11',
      'https://rickandmortyapi.com/api/episode/13',
      'https://rickandmortyapi.com/api/episode/19',
      'https://rickandmortyapi.com/api/episode/21',
      'https://rickandmortyapi.com/api/episode/25',
    ],
    url: 'https://rickandmortyapi.com/api/character/362',
    created: '2018-01-10T18:52:08.927Z',
  },
  {
    id: 363,
    name: 'Trandor',
    status: Status.ALIVE,
    species: 'Alien',
    type: 'Krootabulan',
    gender: 'Male',
    origin: {
      name: 'Krootabulon',
      url: 'https://rickandmortyapi.com/api/location/45',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/363.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/30'],
    url: 'https://rickandmortyapi.com/api/character/363',
    created: '2018-01-10T18:54:36.578Z',
  },
  {
    id: 381,
    name: 'Woman Rick',
    status: Status.ALIVE,
    species: 'Alien',
    type: 'Chair',
    gender: 'Female',
    origin: { name: 'unknown', url: '' },
    location: { name: 'unknown', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/381.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/10'],
    url: 'https://rickandmortyapi.com/api/character/381',
    created: '2018-01-10T19:46:00.622Z',
  },
].map((v) => CharacterEndpointToDomain(v));
