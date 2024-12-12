import { motion } from 'framer-motion';
import { useTheme } from '@/components/ui/theme';

interface LetterBoxProps {
  letter: string;
  isHidden: boolean;
  isCorrect: boolean | null;
}

export function LetterBox({ letter, isHidden, isCorrect }: LetterBoxProps) {
  const { isDark, colorTheme } = useTheme();

  return (
    <motion.div
      className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl font-bold ${
        isDark ? 'bg-gray-700' : 'bg-gray-100'
      }`}
      animate={isHidden && isCorrect !== null ? {
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      } : {}}
    >
      <span className={`${
        isHidden 
          ? isCorrect === null 
            ? 'opacity-0' 
            : isCorrect 
              ? `text-${colorTheme}` 
              : isDark 
                ? 'text-white' 
                : 'text-gray-800'
          : isDark 
            ? 'text-white' 
            : 'text-gray-800'
      }`}>
        {letter}
      </span>
    </motion.div>
  );
}