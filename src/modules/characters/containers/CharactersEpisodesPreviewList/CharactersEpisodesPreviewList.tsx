import NextLink from 'next/link';
import React from 'react';
import { useEpisodesPreviewListQuery } from 'src/modules/episodes/hooks/useEpisodesPreviewListQuery';
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
          <NextLink href="/">
            <Link
              primary
              variant="outline"
              className="block truncate tracking-wide lg:tracking-widest"
            >
              <Tooltip
                content={
                  episode.name +
                  ' / ' +
                  episode.episode +
                  ' / ' +
                  episode.airDate
                }
              >
                <Text as="span" className="">
                  {episode.name} / {'  '}
                  <small>
                    {episode.episode} /{' '}
                    <time className="">{episode.airDate}</time>
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
