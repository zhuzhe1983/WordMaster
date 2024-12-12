import { cn } from '@/lib/utils';
import { useTheme } from './theme';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({ value, max, className }: ProgressProps) {
  const { colorTheme, isDark } = useTheme();
  const percentage = (value / max) * 100;

  return (
    <div className={cn(
      'w-full rounded-full h-1.5',
      isDark ? 'bg-gray-700/50' : 'bg-gray-200/50',
      className
    )}>
      <div
        className={cn(
          'h-1.5 rounded-full transition-all duration-500',
          `bg-${colorTheme}`
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}