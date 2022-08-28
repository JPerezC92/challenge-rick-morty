import { CharactersLSKeys } from 'src/modules/characters/service/CharactersLSKeys';
import { MemoryGameLSKeys } from 'src/modules/memory-game/service/MemoryGameLSKeys';

type LocalStorageKeys = `${MemoryGameLSKeys}` | `${CharactersLSKeys}`;

interface LocalStorageService {
  getItem: (key: LocalStorageKeys) => string | undefined;
  setItem: (key: LocalStorageKeys, value: string) => void;
}

export const LocalStorageService: LocalStorageService = {
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },

  getItem: (key) => {
    const value = window.localStorage.getItem(key);

    if (!value) return;

    return value;
  },
};
