import { useQuery } from '@tanstack/react-query';

export function usePageQueryString(
  queryKeys: readonly string[],
  pageQueryString: string,
  config?: { enabled?: boolean }
) {
  return useQuery(
    queryKeys,
    () => {
      return Number(pageQueryString) || 1;
    },
    { ...config }
  );
}
