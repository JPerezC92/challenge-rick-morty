import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbDoorExit, TbPlayerPlay } from 'react-icons/tb';
import { MemoryGameLayout } from 'src/modules/memory-game/components/MemoryGameLayout';
import { BoardSize } from 'src/modules/memory-game/models/BoardSize';
import { GameModes } from 'src/modules/memory-game/models/GameModes';
import { MemoryGameRoutes } from 'src/modules/memory-game/models/routes';
import { useConfigurationStore } from 'src/modules/memory-game/store/useConfigurationStore';
import { Button } from 'src/modules/shared/components/Button';
import { Icon } from 'src/modules/shared/components/Icon';
import { SEO } from 'src/modules/shared/components/SEO';
import { Text } from 'src/modules/shared/components/Text';
import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';
import { rgbDataURL } from 'src/modules/shared/utils/rgbDataURL';

const MemoryGamePage: NextPage = () => {
  const router = useRouter();
  const boardSize = useConfigurationStore((s) => s.boardSize);
  const gameMode = useConfigurationStore((s) => s.gameMode);
  const isLoaded = useConfigurationStore((s) => s.isLoaded);
  const changeBoardSize = useConfigurationStore((s) => s.changeBoardSize);
  const changeGameMode = useConfigurationStore((s) => s.changeGameMode);

  return (
    <MemoryGameLayout>
      <SEO title="Rick&Morty" siteTitle="Game menu" description="Game menu" />

      <main className="mx-auto grid min-h-screen max-w-7xl">
        <div className="flex h-full flex-col items-center justify-center space-y-4 bg-ct-neutral-dark-700/90 xl:m-4 xl:my-auto xl:h-auto xl:min-h-[85%] xl:rounded-xl xl:py-8">
          <picture className="relative w-full max-w-xs overflow-hidden rounded-lg bg-ct-secondary-400 md:max-w-md">
            <Image
              className="mix-blend-multiply"
              src="/memory-game/logo.png"
              alt="Memory game logo"
              width={1280}
              height={720}
              layout="responsive"
              placeholder="blur"
              blurDataURL={rgbDataURL(31, 215, 250)}
            />
          </picture>

          {!isLoaded ? (
            <Icon
              className="animate-spin text-ct-secondary-400"
              as={AiOutlineLoading3Quarters}
              variant="xl"
            />
          ) : (
            <>
              <fieldset className="mx-auto w-full max-w-xs rounded border-2 border-ct-secondary-400 py-2 md:max-w-md">
                <legend className="ml-2 px-1 font-semibold text-ct-secondary-400">
                  <Text>Game Mode</Text>
                </legend>

                <ol className="mx-4 w-max">
                  {Object.entries(GameModes).map(([label, value]) => (
                    <li key={value}>
                      <label
                        htmlFor={value.toString()}
                        className={`space-x-2  ${
                          gameMode === value
                            ? 'text-ct-secondary-400'
                            : 'text-ct-neutral-ligth-50'
                        }`}
                      >
                        <input
                          checked={gameMode === value}
                          id={value.toString()}
                          name="game-mode"
                          onChange={() => changeGameMode(value)}
                          type="radio"
                          value={value}
                        />
                        <Text as="span" l1>
                          {value}
                        </Text>
                      </label>
                    </li>
                  ))}
                </ol>
              </fieldset>

              <fieldset className="mx-auto w-full max-w-xs rounded border-2 border-ct-secondary-400 py-2 md:max-w-md">
                <legend className="ml-2 px-1 font-semibold text-ct-secondary-400">
                  <Text>Board size</Text>
                </legend>

                <ol className="mx-auto flex w-max gap-x-5">
                  {Object.values(BoardSize).map(
                    (size: BoardSize[keyof BoardSize]) => (
                      <li key={size}>
                        <label
                          htmlFor={size.toString()}
                          className={`space-x-2  ${
                            boardSize === size
                              ? 'text-ct-secondary-400'
                              : 'text-ct-neutral-ligth-50'
                          }`}
                        >
                          <input
                            checked={boardSize === size}
                            id={size.toString()}
                            name="cards"
                            onChange={() => changeBoardSize(size)}
                            type="radio"
                            value={size}
                          />
                          <Text as="span" l1>
                            {size} cards
                          </Text>
                        </label>
                      </li>
                    )
                  )}
                </ol>
              </fieldset>

              <Button
                l1
                secondary
                outline
                className="w-full max-w-xs md:max-w-md"
                onClick={() => router.push(MemoryGameRoutes.newGamePath)}
              >
                <Icon as={TbPlayerPlay} variant="sm" className="mr-2" />
                Start
              </Button>

              <Button
                l1
                secondary
                outline
                className="w-full max-w-xs md:max-w-md"
                onClick={() => router.push(EnvironmentVariable.WEB_URL)}
              >
                <Icon as={TbDoorExit} variant="sm" className="mr-2" />
                Exit
              </Button>
            </>
          )}
        </div>
      </main>
    </MemoryGameLayout>
  );
};

export default MemoryGamePage;
