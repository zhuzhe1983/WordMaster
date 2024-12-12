import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordList } from '@/types';

export type ColorTheme = 'pink' | 'mint' | 'lavender' | 'yellow' | 'blue';

interface Settings {
  theme: 'light' | 'dark';
  colorTheme: ColorTheme;
  language: string;
  wordLists: WordList[];
  autoPlay: boolean;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  colorTheme: 'pink',
  language: 'en',
  wordLists: [],
  autoPlay: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'word-master-settings',
    }
  )
);