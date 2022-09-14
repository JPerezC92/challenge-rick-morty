import Image from 'next/image';
import React from 'react';

import { PlayingCard as PlayingCardModel } from 'src/modules/memory-game/models/PlayingCard';
import { rgbDataURL } from 'src/modules/shared/utils/rgbDataURL';

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
      className={`relative h-48 w-full overflow-hidden rounded-lg border shadow-[0_0_5px_2px]  outline-offset-2 outline-ct-neutral-ligth-400 drop-shadow-lg transition ease-in-out sm:h-52 md:h-72 ${className}`}
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
        priority
        layout="fill"
        placeholder="blur"
        blurDataURL={rgbDataURL(22, 33, 86)}
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
        placeholder="blur"
        blurDataURL={rgbDataURL(31, 215, 250)}
      />
    </button>
  );
};
