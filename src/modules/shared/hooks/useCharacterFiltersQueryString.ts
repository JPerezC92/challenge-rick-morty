import { useQuery } from '@tanstack/react-query';

export function useCharacterFiltersQueryString(
  queryKeys: readonly string[],
  query: { pageQueryString?: string; nameQueryString?: string },
  config?: { enabled?: boolean }
) {
  return useQuery(
    queryKeys,
    () => {
      const { pageQueryString, nameQueryString } = query;

      return { page: Number(pageQueryString) || 1, name: nameQueryString };
    },
    { ...config, keepPreviousData: true }
  );
}
