import { useRouter } from 'next/router';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { CharactersRoutes } from 'src/modules/characters/models/routes';
import { IconButton } from 'src/modules/shared/components/IconButton';

type CharacterSearcherProps = {
  className?: string;
  onSearch?: () => void;
};

export const CharacterSearcher: React.FC<CharacterSearcherProps> = ({
  className = '',
  onSearch,
}) => {
  const router = useRouter();
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push({
      pathname: CharactersRoutes.rootPath,
      query: { name: name },
    });

    onSearch?.();
  };

  return (
    <form
      className={`grid w-full grid-cols-[1fr_auto] ${className}`}
      onSubmit={handleSubmit}
    >
      <input
        autoFocus
        className="rounded-l border px-2 font-nunito text-ct-secondary-500 outline-ct-neutral-ligth-400"
        type="text"
        name={name}
        id="name"
        placeholder="E.g: Rick"
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />

      <IconButton
        type="submit"
        icon={FiSearch}
        className="rounded-l-none rounded-r border bg-white text-ct-secondary-400 outline-ct-neutral-ligth-400 hover:saturate-200 md:col-start-3"
      />
    </form>
  );
};
