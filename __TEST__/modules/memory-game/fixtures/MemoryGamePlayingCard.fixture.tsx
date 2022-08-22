import { MemoryGamePlayingCard } from 'src/modules/memory-game/containers/MemoryGamePlayingCard';

export const MemoryGamePlayingCardFixture = ({
  isFlip,
  playingCardModel,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<typeof MemoryGamePlayingCard>) => {
  return (
    <button
      disabled={disabled}
      {...props}
      onClick={() => {
        onClick?.(playingCardModel);
      }}
    >
      flip {`${isFlip}`} disabled {`${disabled}`}
    </button>
  );
};
