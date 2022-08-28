import Image from 'next/image';
import React from 'react';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Status } from 'src/modules/characters/models/Status';
import { Text } from 'src/modules/shared/components/Text';

type CharactersPreviewCardProps = {
  className?: string;
  characterPreview: CharacterPreview;
};

export const CharactersPreviewCard: React.FC<CharactersPreviewCardProps> = ({
  className = '',
  characterPreview,
}) => {
  const { status, id, img, apparitionEpisodes, name, species } =
    characterPreview;

  return (
    <article
      className={`grid grid-cols-[40%_60%] overflow-hidden rounded-l-full border bg-ct-neutral-dark-700/50 shadow ${
        status === Status.ALIVE
          ? 'border-ct-primary-300 shadow-ct-primary-400'
          : status === Status.DEAD
          ? 'border-ct-error-300 shadow-ct-error-400'
          : 'border-ct-neutral-dark-300 shadow-ct-neutral-dark-400'
      } ${className}`}
    >
      <picture className="relative">
        <Image alt={name} layout="fill" priority objectFit="cover" src={img} />
      </picture>

      <div className="p-4">
        <header>
          <Text
            l1
            variant="ALL_CAPS"
            className="truncate bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text font-extrabold tracking-wide text-transparent"
            as="p"
          >
            {name}
          </Text>

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
                className="text-ct-neutral-medium-100"
                title={v.value}
              >
                <b className="capitalize">{v.description}: </b>
                {v.value}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
