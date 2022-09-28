import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { CharacterView } from 'src/modules/characters/dto/CharacterView';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { Tooltip } from 'src/modules/shared/components/Tooltip';
import { rgbDataURL } from 'src/modules/shared/utils/rgbDataURL';

type EpisodeCharacterAvatarListProps = {
  className?: string;
  characterViewList: CharacterView[];
};

export const EpisodeCharacterAvatarList: React.FC<
  EpisodeCharacterAvatarListProps
> = ({ className = '', characterViewList }) => {
  const { push } = useRouter();
  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] gap-2 sm:grid-cols-[repeat(auto-fit,minmax(4.5rem,1fr))] ${className}`}
    >
      {characterViewList.map((character) => (
        <li key={character.id} className="contents">
          <Tooltip content={character.name}>
            <button
              onClick={() => push(CharactersRoutes.characterId(character.id))}
              className="outline-ct-neutral-ligth-400"
            >
              <picture className="block overflow-hidden rounded-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(164, 63, 217)}
                  layout="responsive"
                />
              </picture>
            </button>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};
