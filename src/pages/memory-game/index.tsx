import { useRouter } from 'next/router';
import { MemoryGameLayout } from 'src/modules/memory-game/components/MemoryGameLayout';
import { useMemoryGameConfigurationContext } from 'src/modules/memory-game/context/MemoryGameConfigurationContext';
import { Board } from 'src/modules/memory-game/models/Board';
import { MemoryGameRoutes } from 'src/modules/memory-game/models/routes';
import { Button } from 'src/modules/shared/components/Button';
import { Text } from 'src/modules/shared/components/Text';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';
import { NextPageWithLayout } from 'src/pages/_app';

const MemoryGamePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { boardSize, setBoardSize, isLoading } =
    useMemoryGameConfigurationContext();

  return (
    <main className="">
      <div className="m-auto space-y-4 rounded-xl border-2 bg-ct-neutral-dark-600/80 py-4">
        {isLoading ? (
          <h1>...loading...</h1>
        ) : (
          <>
            <Button
              primary
              className="m-auto block w-full max-w-xs"
              onClick={() => router.push(MemoryGameRoutes.newGamePath)}
            >
              New Game
            </Button>

            <Button
              primary
              className="m-auto block w-full max-w-xs"
              onClick={() => router.push(EnvironmentVariable.WEB_URL)}
            >
              Back to the main page
            </Button>

            <fieldset className="m-auto max-w-xs space-x-4 rounded border-2 border-ct-secondary-400 p-4">
              <legend className="px-2 text-ct-secondary-400">
                <Text l1>Board size</Text>
              </legend>

              <ol>
                {Board.sizes.map((v) => (
                  <li key={v}>
                    <label
                      htmlFor={v.toString()}
                      className="space-x-2 text-ct-neutral-ligth-50"
                    >
                      <input
                        checked={boardSize === v}
                        id={v.toString()}
                        name="cards"
                        onChange={() => setBoardSize(v)}
                        type="radio"
                        value={v}
                      />
                      <Text as="span">{v} cards</Text>
                    </label>
                  </li>
                ))}
              </ol>
            </fieldset>
          </>
        )}
      </div>
    </main>
  );
};

export default MemoryGamePage;

MemoryGamePage.getLayout = (page) => (
  <MemoryGameLayout>{page}</MemoryGameLayout>
);
