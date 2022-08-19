import { useRouter } from 'next/router';
import React from 'react';

export function useQueryString<Queryparams = Record<string, string>>(
  initialQueryString: Queryparams
) {
  const initialQueryStringRef = React.useRef(initialQueryString);
  const [queryString, setQueryString] = React.useState(initialQueryString);
  const [isLoading, setIsLoading] = React.useState(true);
  const { query } = useRouter();

  React.useEffect(() => {
    setIsLoading(true);
    if (Object.keys(query).length === 0) return setIsLoading(false);

    const decodedQueryString = Object.entries(
      initialQueryStringRef.current
    ).reduce(
      (acc, [key]) => ({
        ...acc,
        [key]: query[key] || '',
      }),
      {} as Queryparams
    );
    console.log({ decodedQueryString });
    setQueryString({ ...decodedQueryString });
    setIsLoading(false);
  }, [query]);

  return { ...queryString, isLoading };
}
