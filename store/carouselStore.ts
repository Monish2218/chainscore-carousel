import { Chapter } from "@/types";
import {create} from "zustand";

interface CarouselState {
  userXP: number;
  chapters: Chapter[];
  setUserXP: (xp: number) => void;
  setChapters: (chapters: Chapter[]) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  userXP: 0,
  chapters: [],
  setUserXP: (xp) => set({ userXP: xp }),
  setChapters: (chapters) => set({ chapters }),
}));