import { LucideIcon } from 'lucide-react';

export interface Word {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  examples: string[];
  story?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  progress: {
    wordsLearned: number;
    streak: number;
    level: number;
  };
  wordLists: WordList[];
}

export interface WordList {
  id: string;
  name: string;
  words: Word[];
  category: WordListCategory;
  description?: string;
  icon?: LucideIcon;
}

export type WordListCategory = 'all' | 'school' | 'dictionary' | 'exam' | 'literature' | 'custom';

export interface LocaleMessages {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    loading: string;
    error: string;
    success: string;
  };
  wordList: {
    title: string;
    empty: string;
    addNew: string;
    categories: {
      all: string;
      school: string;
      dictionary: string;
      exam: string;
      literature: string;
      custom: string;
    };
  };
  nav: {
    learn: string;
    games: string;
    achievements: string;
    friends: string;
    settings: string;
  };
  settings: {
    title: string;
    language: string;
    theme: string;
    wordLists: string;
    themes: {
      light: string;
      dark: string;
    };
  };
  games: {
    title: string;
    typing: {
      name: string;
      description: string;
    };
    shooter: {
      name: string;
      description: string;
    };
    puzzle: {
      name: string;
      description: string;
    };
    guessing: {
      name: string;
      description: string;
    };
  };
  learn: {
    progress: string;
    wordsLearned: string;
    of: string;
    longPress: string;
    wordCard: {
      save: string;
      share: string;
      play: string;
      like: string;
      speak: string;
      next: string;
      previous: string;
    };
  };
  achievements: {
    title: string;
    streak: {
      title: string;
      description: string;
    };
    words: {
      title: string;
      description: string;
    };
    games: {
      title: string;
      description: string;
    };
  };
  friends: {
    title: string;
    addFriend: string;
    searchPlaceholder: string;
    noFriends: string;
    invite: string;
  };
}