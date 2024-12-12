import { Trophy, Award, Star } from 'lucide-react';
import { useTheme } from '@/components/ui/theme';
import { AchievementCard } from '@/components/achievements/AchievementCard';

export function Achievements() {
  const { colorTheme, isDark } = useTheme();

  const achievements = [
    {
      icon: Trophy,
      title: '7-Day Streak',
      progress: 5,
      total: 7,
      color: colorTheme,
    },
    {
      icon: Award,
      title: 'Vocabulary Master',
      progress: 150,
      total: 500,
      color: colorTheme,
    },
    {
      icon: Star,
      title: 'Perfect Practice',
      progress: 3,
      total: 5,
      color: colorTheme,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>Your Achievements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
}