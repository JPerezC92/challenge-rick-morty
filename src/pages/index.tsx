import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';

import { CharacterCard } from 'src/modules/characters/containers/CharacterCard';
import { ApiCharactersRepository } from 'src/modules/characters/service/useCharactersRepository';
import { shuffleArray } from 'src/modules/shared/utils/shuffleArray';

const Home: NextPage = () => {
  return (
    <>
      <main className="max-w-lg sm:max-w-3xl">
        <h1 className="mb-10 text-9xl">Rick &amp; Morty app!</h1>
      </main>
    </>
  );
};

export default Home;
