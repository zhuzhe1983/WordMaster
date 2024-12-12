import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Word, WordList } from '@/types';
import { defaultWordLists } from '@/data/wordLists';

interface WordListsState {
  lists: WordList[];
  activeListId: string | null;
  savedWords: WordList;
  setActiveList: (id: string | null) => void;
  addList: (list: WordList) => void;
  removeList: (id: string) => void;
  updateList: (id: string, updates: Partial<WordList>) => void;
  addToSavedWords: (word: Word) => void;
  removeFromSavedWords: (wordId: string) => void;
  initializeLists: () => void;
}

// Initialize saved words list with unique ID
const initialSavedWords: WordList = {
  id: `saved-words-${Date.now()}`,
  name: '生词本',
  category: 'custom',
  description: '我的生词本',
  words: []
};

export const useWordListsStore = create<WordListsState>()(
  persist(
    (set) => ({
      lists: [],
      activeListId: null,
      savedWords: initialSavedWords,
      setActiveList: (id) => set({ activeListId: id }),
      addList: (list) => set((state) => ({
        lists: [...state.lists, {
          ...list,
          id: `list-${list.id}-${Date.now()}` // Ensure unique ID for new lists
        }]
      })),
      removeList: (id) => set((state) => ({
        lists: state.lists.filter((list) => list.id !== id),
        activeListId: state.activeListId === id ? null : state.activeListId,
      })),
      updateList: (id, updates) => set((state) => ({
        lists: state.lists.map((list) =>
          list.id === id ? { ...list, ...updates } : list
        ),
      })),
      addToSavedWords: (word) => set((state) => ({
        savedWords: {
          ...state.savedWords,
          words: [...state.savedWords.words, {
            ...word,
            id: `saved-${word.id}-${Date.now()}` // Ensure unique ID for saved words
          }]
        }
      })),
      removeFromSavedWords: (wordId) => set((state) => ({
        savedWords: {
          ...state.savedWords,
          words: state.savedWords.words.filter(w => w.id !== wordId)
        }
      })),
      initializeLists: () => set((state) => ({
        lists: state.lists.length === 0 ? defaultWordLists : state.lists
      })),
    }),
    {
      name: 'word-master-lists',
    }
  )
);