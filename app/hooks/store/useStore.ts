import { create } from "zustand";

type globalStoreTypes = {
  previews: any[];
  setPreviews: (data: any[]) => void;
};
export const useStore = create<globalStoreTypes>((set) => ({
  previews: [...Array(3)],
  setPreviews: (data: any[]) => set(() => ({ previews: data })),
}));
