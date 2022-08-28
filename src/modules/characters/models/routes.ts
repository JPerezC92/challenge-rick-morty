import { EnvironmentVariable } from 'src/modules/shared/utils/envVariables';

const Characters = EnvironmentVariable.WEB_URL;
export const CharactersRoutes = {
  rootPath: Characters,
  characterId: (id: string | number) => CharactersRoutes.rootPath + `/${id}`,
};
