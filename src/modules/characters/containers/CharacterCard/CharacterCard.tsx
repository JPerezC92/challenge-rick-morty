import Image from 'next/image';
import React from 'react';

import { Character } from 'src/modules/characters/models/Character';

import styles from './CharacterCard.module.css';

type CharacterCardProps = Character;

export const CharacterCard: React.FC<CharacterCardProps> = ({
  image,
  name,
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((s) => !s)}
      className={`${styles.card} relative min-h-[15rem] overflow-hidden rounded-lg border shadow-[0_0_5px_2px] shadow-emerald-500 drop-shadow-lg transition ease-in-out sm:min-h-[18rem]`}
    >
      <Image
        className={` ${
          isFlipped ? 'opacity-0' : 'opacity-1'
        } transition duration-500 ease-in-out`}
        src="/card-backface.jpg"
        alt="rick & morty card"
        width={40}
        height={60}
        objectFit="cover"
        priority
        layout="responsive"
      />

      <Image
        className={` ${
          isFlipped ? 'opacity-1' : 'opacity-0'
        } transition duration-500 ease-in-out`}
        src={image}
        alt="rick & morty card"
        width={40}
        height={60}
        objectFit="cover"
        priority
        layout="responsive"
      />
    </button>
  );
};
