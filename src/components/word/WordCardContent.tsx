import { useTheme } from '../ui/theme';
import { Word } from '@/types';

interface WordCardContentProps {
  word: Word;
}

export function WordCardContent({ word }: WordCardContentProps) {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4">
      <p className={`${
        isDark ? 'text-gray-300' : 'text-gray-600'
      } ${word.imageUrl ? 'text-shadow-sm' : ''}`}>
        {word.pronunciation}
      </p>
      
      <p className={`${
        isDark ? 'text-white' : 'text-gray-800'
      } ${word.imageUrl ? 'text-shadow' : ''}`}>
        {word.definition}
      </p>
      
      <div className="space-y-2">
        {word.examples.map((example, index) => (
          <p key={index} className={`italic ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } ${word.imageUrl ? 'text-shadow-sm' : ''}`}>
            "{example}"
          </p>
        ))}
      </div>

      {word.story && (
        <div className={`p-4 rounded-lg ${
          isDark 
            ? 'bg-gray-800/80 text-gray-200' 
            : 'bg-white/80 text-gray-700'
        } backdrop-blur-sm`}>
          <p className={word.imageUrl ? 'text-shadow-sm' : ''}>
            {word.story}
          </p>
        </div>
      )}
    </div>
  );
}