import { create } from "zustand";
import { QueryKey } from "@tanstack/react-query";

type StoreState = {
  queryKeys: Record<string, QueryKey>;
  addQueryKey: (key: string, queryKey: QueryKey) => void;
  removeQueryKey: (key: string) => void;
  getQueryKey: (key: string) => QueryKey | undefined;
};

export const useQueryStore = create<StoreState>((set, get) => ({
  queryKeys: {},
  addQueryKey: (key, queryKey) =>
    set((state) => ({
      queryKeys: { ...state.queryKeys, [key]: queryKey },
    })),
  removeQueryKey: (key) =>
    set((state) => {
      const updatedQueryKeys = { ...state.queryKeys };
      delete updatedQueryKeys[key];
      return { queryKeys: updatedQueryKeys };
    }),
  getQueryKey: (key) => {
    const state = get();
    return state.queryKeys[key];
  },
}));
