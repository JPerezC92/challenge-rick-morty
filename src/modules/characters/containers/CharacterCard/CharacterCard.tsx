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
  onClick?: (playingCard: PlayingCard) => void;
  flip?: boolean;
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
      className={`relative w-full overflow-hidden rounded-lg border shadow-[0_0_5px_2px] shadow-ct-secondary-300 drop-shadow-lg transition ease-in-out`}
      {...props}
    >
      <Image
        className={` ${
          flip ? 'scale-0 opacity-0' : 'opacity-1 scale-100'
        } transition duration-500 ease-in-out`}
        src="/card-backface.jpg"
        alt="rick & morty card"
        width={154}
        height={231}
        objectFit="cover"
        objectPosition="top"
        priority
        layout="fill"
      />

      <Image
        className={` ${
          flip ? 'opacity-1 scale-100' : '-z-10 scale-0 opacity-0'
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
