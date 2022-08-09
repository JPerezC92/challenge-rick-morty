import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MemoryGameRoutes } from 'src/modules/memory-game/routes';
import { Button } from 'src/modules/shared/components/Button';

const MemoryGamePage: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>MemoryGamePage</h1>

      <div>
        <button>config</button>
      </div>

      <div>
        <Button
          className="block"
          onClick={() => router.push(MemoryGameRoutes.newGamePath)}
        >
          new Game
        </Button>
      </div>
    </div>
  );
};

export default MemoryGamePage;
