import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { Status } from 'src/modules/characters/models/Status';
import { Heading } from 'src/modules/shared/components/Heading';
import { Text } from 'src/modules/shared/components/Text';
import { Tooltip } from 'src/modules/shared/components/Tooltip';

type CharactersPreviewCardProps = {
  className?: string;
  characterPreview: CharacterPreview;
};

export const CharactersPreviewCard: React.FC<CharactersPreviewCardProps> = ({
  className = '',
  characterPreview,
}) => {
  const {
    status,
    id,
    image: img,
    apparitionEpisodes,
    name,
    species,
  } = characterPreview;

  return (
    <article
      className={`grid grid-cols-[40%_60%] overflow-hidden rounded-l-full border bg-ct-neutral-dark-700/50 shadow sm:grid-cols-[35%_65%] md:grid-cols-[38%_62%] ${
        status === Status.ALIVE
          ? 'border-ct-primary-300 shadow-ct-primary-400'
          : status === Status.DEAD
          ? 'border-ct-error-300 shadow-ct-error-400'
          : 'border-ct-neutral-dark-300 shadow-ct-neutral-dark-400'
      } ${className}`}
    >
      <picture className="relative">
        <Image
          alt={name}
          className="object-cover"
          layout="fill"
          priority
          src={img}
        />
      </picture>

      <div
        className={`overflow-hidden border-l px-4 py-8 md:py-4 ${
          status === Status.ALIVE
            ? 'border-ct-primary-300 shadow-ct-primary-400'
            : status === Status.DEAD
            ? 'border-ct-error-300 shadow-ct-error-400'
            : 'border-ct-neutral-dark-300 shadow-ct-neutral-dark-400'
        }`}
      >
        <header>
          <Tooltip content={name}>
            <Heading
              card
              as="h3"
              className="truncate overflow-ellipsis"
              colorGradient="special1"
            >
              <Link href={CharactersRoutes.characterId(id)}>
                <a>{name}</a>
              </Link>
            </Heading>
          </Tooltip>

          <Text
            l2
            variant="ALL_CAPS"
            className="block text-ct-neutral-ligth-500"
          >
            Episode(s) {apparitionEpisodes}
          </Text>
        </header>

        <hr
          className={`my-2 shadow ${
            status === Status.ALIVE
              ? 'border-ct-primary-300 shadow-ct-primary-400'
              : status === Status.DEAD
              ? 'border-ct-error-300 shadow-ct-error-400'
              : 'border-ct-neutral-dark-300 shadow-ct-neutral-dark-400'
          }`}
        />

        <ul>
          {[
            { description: 'Status', value: status },
            { description: 'specie', value: species },
          ].map((v) => (
            <li key={v.description}>
              <Text
                l1
                variant="LIGHT_WEIGTH"
                className="truncate text-ct-neutral-medium-100"
                as="p"
              >
                <b className="capitalize">{v.description}: </b>

                <Tooltip content={v.value}>
                  <span>{v.value}</span>
                </Tooltip>
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
