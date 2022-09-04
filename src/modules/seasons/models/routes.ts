import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';

const SEASONS = EnvironmentVariable.WEB_URL + '/seasons';

export const SeasonsRoutes = {
  rootPath: SEASONS,
  seasonsId: (seasonId: string) => SEASONS + `/${seasonId}`,
} as const;
