import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

export const playingCard1 = new PlayingCard({
  boardId: 'b-1',
  id: 1,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  name: 'Rick',
});

export const playingCard2 = new PlayingCard({
  boardId: 'b-2',
  id: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  name: 'Morty',
});
