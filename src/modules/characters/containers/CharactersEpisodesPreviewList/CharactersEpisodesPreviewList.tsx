import NextLink from 'next/link';
import React from 'react';
import { useEpisodesPreviewListQuery } from 'src/modules/episodes/hooks/useEpisodesPreviewListQuery';
import { SeasonsRoutes } from 'src/modules/seasons/models/routes';
import { Link } from 'src/modules/shared/components/Link';
import { Text } from 'src/modules/shared/components/Text';
import { Tooltip } from 'src/modules/shared/components/Tooltip';

type CharactersEpisodesPreviewListProps = {
  className?: string;
  episodeIdList: number[];
};

export const CharactersEpisodesPreviewList: React.FC<
  CharactersEpisodesPreviewListProps
> = ({ className = '', episodeIdList }) => {
  const { data } = useEpisodesPreviewListQuery(episodeIdList);

  if (!data) return <>...Loading</>;

  return (
    <ul className={`${className}`}>
      {data.map((episode) => (
        <li key={episode.id}>
          <NextLink
            href={{
              pathname: SeasonsRoutes.seasonsId(episode.seasonId),
              query: { episodeCode: episode.code },
            }}
            passHref
          >
            <Link
              primary
              variant="outline"
              className="block truncate tracking-wide lg:tracking-widest"
            >
              <Tooltip
                content={
                  episode.name + ' / ' + episode.code + ' / ' + episode.airDate
                }
              >
                <Text as="span" className="">
                  {episode.name} / {'  '}
                  <small>
                    {episode.code} / <time className="">{episode.airDate}</time>
                  </small>
                </Text>
              </Tooltip>
            </Link>
          </NextLink>
        </li>
      ))}
    </ul>
  );
};
