import { useState, useEffect } from 'react';

const DAILY_PROGRESS_KEY = 'word-master-daily-progress';
const DAILY_GOAL = 20;

interface Progress {
  date: string;
  count: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(DAILY_PROGRESS_KEY);
    
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === today) {
        return data;
      }
    }
    
    return { date: today, count: 0 };
  });

  useEffect(() => {
    localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const incrementProgress = () => {
    setProgress(prev => ({
      ...prev,
      count: Math.min(prev.count + 1, DAILY_GOAL)
    }));
  };

  return {
    progress: progress.count,
    goal: DAILY_GOAL,
    incrementProgress
  };
}