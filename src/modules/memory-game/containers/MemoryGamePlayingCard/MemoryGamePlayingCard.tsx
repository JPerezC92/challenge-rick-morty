import Image from 'next/image';
import React from 'react';

import { PlayingCard as PlayingCardModel } from 'src/modules/memory-game/models/PlayingCard';

type MemoryGamePlayingCardProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'onClick'
> & {
  playingCardModel: PlayingCardModel;
  isFlip?: boolean;
  onClick?: (playingCard: PlayingCardModel) => void;
};

export const MemoryGamePlayingCard: React.FC<MemoryGamePlayingCardProps> = ({
  className,
  disabled,
  isFlip = false,
  onClick,
  playingCardModel,
  ...props
}) => {
  const { image } = playingCardModel;

  const handleOnClick = () => {
    onClick?.(playingCardModel);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleOnClick}
      className={`relative h-48 w-full overflow-hidden rounded-lg border border-ct-neutral-dark-700 bg-gradient-to-tl from-ct-primary-400 via-ct-secondary-400/80 to-ct-primary-400 shadow-[0_0_5px_2px] shadow-ct-neutral-dark-700 outline-offset-2 outline-ct-neutral-ligth-400 drop-shadow-lg transition ease-in-out sm:h-52 md:h-64 xl:h-72 2xl:h-80 ${className}`}
      {...props}
    >
      <Image
        role={isFlip ? 'none' : 'presentation'}
        className={`${
          isFlip ? 'scale-0 opacity-0' : 'opacity-1 scale-100'
        } transition duration-500 ease-in-out`}
        src="/card-backface.webp"
        alt="rick & morty card backface"
        objectFit="cover"
        objectPosition="center"
        priority
        layout="fill"
      />

      <Image
        role={!isFlip ? 'none' : 'presentation'}
        className={`${
          isFlip ? 'opacity-1 scale-100' : 'scale-0 opacity-0'
        } transition duration-500 ease-in-out`}
        src={image}
        alt="rick & morty card"
        objectFit="cover"
        priority
        layout="fill"
      />
    </button>
  );
};
