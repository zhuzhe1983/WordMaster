import { motion } from 'framer-motion';
import { Word } from '@/types';
import { useTheme } from '@/components/ui/theme';

interface WordListProps {
  words: Word[];
  foundWords: Set<string>;
}

export function WordList({ words, foundWords }: WordListProps) {
  const { isDark, colorTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        Words to Find
      </h3>
      <div className="space-y-3">
        {words.map((word) => {
          const isFound = foundWords.has(word.word);
          return (
            <motion.div
              key={word.id}
              className={`p-3 rounded-lg ${
                isFound
                  ? `bg-${colorTheme}/20`
                  : isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}
              animate={isFound ? { scale: [1, 1.05, 1] } : {}}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${
                  isFound
                    ? `text-${colorTheme}`
                    : isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {word.word}
                </span>
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {word.word.length} letters
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {word.definition}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}