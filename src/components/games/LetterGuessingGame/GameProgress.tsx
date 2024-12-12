import { useTheme } from '@/components/ui/theme';
import { Progress } from '@/components/ui/Progress';

interface GameProgressProps {
  currentWord: number;
  totalWords: number;
  score: number;
}

export function GameProgress({ currentWord, totalWords, score }: GameProgressProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Word {currentWord} of {totalWords}
        </span>
        <span className={`font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Score: {score}
        </span>
      </div>
      <Progress value={currentWord} max={totalWords} />
    </div>
  );
}