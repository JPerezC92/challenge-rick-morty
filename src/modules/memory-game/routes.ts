import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';

const MEMORY_GAME = EnvironmentVariable.WEB_URL + '/memory-game';

export const MemoryGameRoutes = {
  rootPath: MEMORY_GAME,
  newGamePath: MEMORY_GAME + '/new-game',
};
