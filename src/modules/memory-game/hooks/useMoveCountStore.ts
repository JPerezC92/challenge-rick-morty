import React from 'react';

export function useMoveCountStore() {
  const [count, setCount] = React.useState(0);

  const moveCountStore = React.useRef({
    increment: () => setCount((s) => ++s),
    restart: () => setCount(0),
  });

  return {
    count,
    moveCountStore: moveCountStore.current,
  };
}
