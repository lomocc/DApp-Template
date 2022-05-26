import produce from 'immer';
import { useCallback } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type Values = Record<string, string | number | boolean | undefined>;
type StorageStore = {
  values: Values;
  clear: () => void;
  /**
   * 切换功能总开关
   */
  getItem: (key: string) => string | number | boolean | undefined;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string | number | boolean) => void;
};

/**
 * 功能开关管理
 */
export const useLocalStorage = create<StorageStore>()(
  persist(
    (set, get) => ({
      values: {},
      clear: () => set({ values: {} }),
      getItem: (key: string) => get().values[key],
      removeItem: (key: string) => {
        set({
          values: produce(get().values, draft => {
            delete draft[key];
          }),
        });
      },
      setItem: (key: string, value: string | number | boolean) =>
        set({
          values: produce(get().values, draft => {
            draft[key] = value;
          }),
        }),
    }),
    {
      name: 'dapp-storage',
    }
  )
);

const sessionIdKey = 'session-id';

export function useSessionId() {
  return useLocalStorage(
    state => state.getItem(sessionIdKey) as string | undefined
  );
}
export function useSetSessionId() {
  const setItem = useLocalStorage(state => state.setItem);
  return useCallback(
    (value: string) => {
      setItem(sessionIdKey, value);
    },
    [setItem]
  );
}
export function useRemoveSessionId() {
  const removeItem = useLocalStorage(state => state.removeItem);
  return useCallback(() => {
    removeItem(sessionIdKey);
  }, [removeItem]);
}
export function getSessionId() {
  return useLocalStorage.getState().values[sessionIdKey] as string;
}
