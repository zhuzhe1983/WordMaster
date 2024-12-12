import { create } from 'zustand';

interface Achievement {
  id: string;
  title: string;
  progress: number;
  total: number;
  color: string;
  icon: string;
}

interface AchievementsState {
  achievements: Achievement[];
  updateProgress: (id: string, progress: number) => void;
}

export const useAchievementsStore = create<AchievementsState>((set) => ({
  achievements: [],
  updateProgress: (id, progress) => set((state) => ({
    achievements: state.achievements.map((achievement) =>
      achievement.id === id
        ? { ...achievement, progress }
        : achievement
    ),
  })),
}));