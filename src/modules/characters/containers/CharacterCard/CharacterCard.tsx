import Image from 'next/image';
import React from 'react';

import { PlayingCard } from 'src/modules/memory-game/models/PlayingCard';

type CharacterCardProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
> & {
  playingCard: PlayingCard;
  flip?: boolean;
  onClick?: (playingCard: PlayingCard) => void;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  disabled,
  onClick,
  playingCard,
  flip,
  ...props
}) => {
  const { image } = playingCard;

  const handleOnClick = () => {
    onClick?.(playingCard);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleOnClick}
      className={`relative w-full overflow-hidden rounded-lg border border-ct-neutral-dark-700 bg-gradient-to-tl from-ct-primary-400 via-ct-secondary-400/80 to-ct-primary-400 shadow-[0_0_5px_2px] shadow-ct-neutral-dark-700 outline-offset-2 outline-ct-neutral-ligth-400 drop-shadow-lg transition ease-in-out `}
      {...props}
    >
      <Image
        className={` ${
          flip ? 'scale-0 opacity-0' : 'opacity-1 scale-100'
        } transition duration-500 ease-in-out`}
        src="/card-backface.png"
        alt="rick & morty card"
        objectFit="contain"
        objectPosition="center"
        priority
        layout="fill"
      />

      <Image
        className={` ${
          flip ? 'opacity-1 scale-100' : '-z-10 scale-0 opacity-0'
        } transition duration-500 ease-in-out`}
        src={image}
        alt="rick & morty card"
        width={300}
        height={300}
        objectFit="cover"
        priority
        layout="responsive"
      />
    </button>
  );
};
