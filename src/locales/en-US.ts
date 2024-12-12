import { LocaleMessages } from "@/types";

const enUS: LocaleMessages = {
  common: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
  },
  wordList: {
    title: "Word Lists",
    empty: "No word lists found",
    addNew: "Add New List",
    categories: {
      all: "All",
      school: "School",
      dictionary: "Dictionary",
      exam: "Exam Prep",
      literature: "Literature",
      custom: "Custom",
    },
  },
  nav: {
    learn: "Learn",
    games: "Games",
    achievements: "Achievements",
    friends: "Friends",
    settings: "Settings",
  },
  settings: {
    title: "Settings",
    language: "Language",
    theme: "Theme",
    wordLists: "Word Lists",
    themes: {
      light: "Light",
      dark: "Dark",
    },
  },
  games: {
    title: "Games",
    typing: {
      name: "Typing Game",
      description: "Practice your typing speed with vocabulary words",
    },
    shooter: {
      name: "Space Shooter",
      description: "Shoot blocks by typing letters in the correct order",
    },
    puzzle: {
      name: "Word Puzzle",
      description: "Find hidden words in a grid of letters",
    },
    guessing: {
      name: "Letter Guessing",
      description: "Guess the missing letter in words",
    },
  },
  learn: {
    progress: "Daily Progress",
    wordsLearned: "words learned today",
    of: "of",
    longPress: "Long press to see more options",
    wordCard: {
      save: "Save to List",
      share: "Share",
      play: "Play Games",
      like: "Like",
      speak: "Speak",
      next: "Next Word",
      previous: "Previous Word",
    },
  },
  achievements: {
    title: "Your Achievements",
    streak: {
      title: "Daily Streak",
      description: "Days in a row learning new words",
    },
    words: {
      title: "Words Mastered",
      description: "Total words learned",
    },
    games: {
      title: "Game Master",
      description: "High scores in word games",
    },
  },
  friends: {
    title: "Friends",
    addFriend: "Add Friend",
    searchPlaceholder: "Search friends...",
    noFriends: "No friends found",
    invite: "Invite Friends",
  },
};

export default enUS;