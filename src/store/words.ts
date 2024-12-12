import { create } from 'zustand';
import { Word } from '@/types';

interface WordsState {
  words: Word[];
  currentIndex: number;
  setWords: (words: Word[]) => void;
  nextWord: () => void;
  previousWord: () => void;
}

export const useWordsStore = create<WordsState>((set) => ({
  words: [],
  currentIndex: 0,
  setWords: (words) => set({ words, currentIndex: 0 }),
  nextWord: () => set((state) => ({
    currentIndex: (state.currentIndex + 1) % state.words.length,
  })),
  previousWord: () => set((state) => ({
    currentIndex: state.currentIndex === 0 
      ? state.words.length - 1 
      : state.currentIndex - 1,
  })),
}));