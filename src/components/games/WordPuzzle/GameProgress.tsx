import { useTheme } from '@/components/ui/theme';
import { Progress } from '@/components/ui/Progress';

interface GameProgressProps {
  foundWords: number;
  totalWords: number;
  score: number;
}

export function GameProgress({ foundWords, totalWords, score }: GameProgressProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Found {foundWords} of {totalWords} words
        </span>
        <span className={`font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Score: {score}
        </span>
      </div>
      <Progress value={foundWords} max={totalWords} />
    </div>
  );
}