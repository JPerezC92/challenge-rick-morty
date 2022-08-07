import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { ApiCharactersRepository } from 'src/modules/characters/service/useCharactersRepository';
import { shuffleArray } from 'src/modules/shared/utils/shuffleArray';

const MemoryGamePage: NextPage = () => {
  const { data: characterList } = useQuery(
    ['characterList'],
    async ({ signal }) => {
      const _characterRepository = ApiCharactersRepository(signal);

      const charactersCount = await _characterRepository.getCount();

      if (!charactersCount) return;

      const characterList = await _characterRepository.getRamdomCharacterList({
        count: charactersCount,
        limit: 6,
      });

      if (!characterList) return;

      return shuffleArray([...characterList, ...characterList]);
    },
    { refetchOnWindowFocus: false, refetchInterval: false }
  );
  return (
    <div>
      <h1>MemoryGamePage</h1>

      <div>
        <button>config</button>
      </div>

      <div>
        <button>new Game</button>
      </div>

      <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {characterList?.map((character, i) => (
          <li key={character.id + i}>
            <CharacterCard {...character} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoryGamePage;
