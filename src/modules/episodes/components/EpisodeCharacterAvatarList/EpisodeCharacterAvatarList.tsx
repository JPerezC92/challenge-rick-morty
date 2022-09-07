import Image from 'next/image';
import React from 'react';
import { CharacterPreview } from 'src/modules/characters/dto/CharacterPreview';
import { Tooltip } from 'src/modules/shared/components/Tooltip';
import { rgbDataURL } from 'src/modules/shared/utils/rgbDataURL';

type EpisodeCharacterAvatarListProps = {
  className?: string;
  characterPreviewList: CharacterPreview[];
};

export const EpisodeCharacterAvatarList: React.FC<
  EpisodeCharacterAvatarListProps
> = ({ className = '', characterPreviewList: data }) => {
  return (
    <ul className={`flex flex-wrap justify-evenly gap-2 ${className}`}>
      {data?.map((character) => (
        <Tooltip content={character.name} key={character.id}>
          <button>
            <picture className="block h-14 w-14 overflow-hidden rounded-full sm:h-16 sm:w-16">
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
      ))}
    </ul>
  );
};
