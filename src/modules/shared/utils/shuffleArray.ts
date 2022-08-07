import { randomInt } from "./randomInt";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray: T[] = [];
  const tempArray = [...array];

  for (let i = 0; i < array.length; i++) {
    const randomIndex = randomInt(0, tempArray.length - 1);

    shuffledArray.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return shuffledArray;
};
