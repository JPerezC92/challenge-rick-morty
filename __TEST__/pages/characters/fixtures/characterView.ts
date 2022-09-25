import { Status } from 'src/modules/characters/models/Status';

export const characterView = {
  id: 7,
  name: 'Abradolf Lincler',
  image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
  species: 'Human',
  episodesIdList: [10, 11],
  apparitionEpisodesCount: 2,
  status: Status.UNKNOWN,
  gender: 'Male',
  type: 'Genetic experiment',
  actualLocation: {
    id: 21,
    name: 'Testicle Monster Dimension',
  },
  originLocation: {
    id: 20,
    name: 'Earth (Replacement Dimension)',
  },
  episodeViewList: [
    {
      airDate: 'April 7, 2014',
      characterIdList: [
        1, 2, 3, 4, 5, 7, 14, 15, 18, 19, 21, 22, 27, 39, 53, 77, 78, 79, 82,
        83, 84, 85, 86, 103, 113, 118, 119, 152, 164, 177, 209, 215, 232, 242,
        274, 290, 294, 295, 298, 299, 329, 330, 339, 349, 359, 381, 389, 405,
        424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 663,
      ],
      code: 'S01E10',
      created: '2017-11-10T12:56:34.747Z',
      id: 10,
      name: 'Close Rick-counters of the Rick Kind',
      seasonId: 's01',
    },
    {
      airDate: 'April 14, 2014',
      characterIdList: [
        1, 2, 3, 4, 5, 7, 35, 47, 58, 88, 180, 181, 210, 216, 251, 282, 295,
        308, 326, 327, 331, 333, 344, 362, 389, 395, 405, 423, 435, 436,
      ],
      code: 'S01E11',
      created: '2017-11-10T12:56:34.850Z',
      id: 11,
      name: 'Ricksy Business',
      seasonId: 's01',
    },
  ],
};
