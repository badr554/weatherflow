import { useCallback, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage';

export function useLocalStorageState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, fallback));

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update] as const;
}
