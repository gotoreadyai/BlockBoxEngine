import { create } from "zustand";

export type stateType = { type: string; data: any; index: number };
export type ThemeStore = {
  route: string;
  blocks: [number, number, number][];
  fps: string;
  selectedBlock: number;
  scenario:any;
};

export const useThemeStore = create<ThemeStore>(() => ({
  route: "start",
  currentChunk: "chunk01",
  fps: "0",
  blocks: [
    [1, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 1],
  ],
  selectedBlock: 0,
  scenario:{},
}));
