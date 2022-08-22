import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryGamePlayingCard } from 'src/modules/memory-game/containers/MemoryGamePlayingCard';
import { playingCard1 } from '__TEST__/modules/memory-game/fixtures/playingCard.fixture';

const backfaceSrc = '/_next/image?url=%2Fcard-backface.webp&w=3840&q=75';
const cardImgSrc =
  '/_next/image?url=https%3A%2F%2Frickandmortyapi.com%2Fapi%2Fcharacter%2Favatar%2F1.jpeg&w=3840&q=75';

const handleOnClick = jest.fn();

describe('Test <MemoryGamePlayingCard />', () => {
  test('on the initial render the backface should be visible', () => {
    render(<MemoryGamePlayingCard playingCardModel={playingCard1} />);

    const backfaceImg = screen.getByRole('presentation');

    expect(backfaceImg).toHaveAttribute('src', backfaceSrc);
  });

  test('when is flipped the card image should be visible', () => {
    render(<MemoryGamePlayingCard playingCardModel={playingCard1} isFlip />);

    expect(screen.getByRole('presentation')).toHaveAttribute('src', cardImgSrc);
  });

  test('when is clicked should call the function', () => {
    render(
      <MemoryGamePlayingCard
        playingCardModel={playingCard1}
        onClick={handleOnClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handleOnClick).toHaveBeenCalledTimes(1);
    expect(handleOnClick).toHaveBeenCalledWith(playingCard1);
  });
});
