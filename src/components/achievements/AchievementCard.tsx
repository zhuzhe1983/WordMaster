import { LucideIcon } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { useTheme } from '../ui/theme';

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  progress: number;
  total: number;
  color: string;
}

export function AchievementCard({ icon: Icon, title, progress, total, color }: AchievementCardProps) {
  const { isDark } = useTheme();

  return (
    <div className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`w-8 h-8 text-${color}`} />
        <h3 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{title}</h3>
      </div>

      <Progress value={progress} max={total} />
      
      <p className={`mt-2 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {progress} / {total}
      </p>
    </div>
  );
}