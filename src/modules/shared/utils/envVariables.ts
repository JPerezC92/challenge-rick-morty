const RICK_MORTY_BASE_URL =
  process.env.NEXT_PUBLIC_RICK_MORTY_BASE_URL ||
  'https://rickandmortyapi.com/api';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || '';

export const EnvironmentVariable = {
  RICK_MORTY_BASE_URL,
  WEB_URL,
};
