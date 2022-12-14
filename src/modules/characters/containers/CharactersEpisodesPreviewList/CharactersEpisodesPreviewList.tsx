import NextLink from 'next/link';
import React from 'react';
import { EpisodeView } from 'src/modules/episodes/dto/EpisodeView';
import { SeasonsRoutes } from 'src/modules/seasons/models/routes';
import { Link } from 'src/modules/shared/components/Link';
import { Text } from 'src/modules/shared/components/Text';
import { Tooltip } from 'src/modules/shared/components/Tooltip';

type CharactersEpisodesPreviewListProps = {
  className?: string;
  episodeViewList: EpisodeView[];
};

export const CharactersEpisodesPreviewList: React.FC<
  CharactersEpisodesPreviewListProps
> = ({ className = '', episodeViewList }) => {
  return (
    <ol data-testid="episodes-list" className={`${className}`}>
      {episodeViewList.map((episode, i) => (
        <li key={episode.id}>
          <NextLink
            href={{
              pathname: SeasonsRoutes.seasonsId(episode.seasonId),
              query: { ['episode-code']: episode.code },
              hash: episode.code,
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
                <Text as="span" l1>
                  {episode.code} - {episode.name} / {'  '}
                  <small>
                    <time className="">{episode.airDate}</time>
                  </small>
                </Text>
              </Tooltip>
            </Link>
          </NextLink>
        </li>
      ))}
    </ol>
  );
};
