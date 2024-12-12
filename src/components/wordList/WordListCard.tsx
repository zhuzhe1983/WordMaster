import { WordList } from '@/types';
import { Button } from '../ui/Button';
import { Book } from 'lucide-react';
import { useTheme } from '../ui/theme';

interface WordListCardProps {
  list: WordList;
  onStudy?: () => void;
}

export function WordListCard({ list, onStudy }: WordListCardProps) {
  const { isDark, colorTheme } = useTheme();

  return (
    <div className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-3 mb-3">
        <Book className={`w-5 h-5 text-${colorTheme}`} />
        <h3 className={`font-semibold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{list.name}</h3>
      </div>

      <p className={`text-sm ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      } mb-4`}>
        {list.words.length} words • {list.category}
      </p>

      <Button
        variant="primary"
        size="sm"
        className="w-full"
        onClick={onStudy}
      >
        Study
      </Button>
    </div>
  );
}