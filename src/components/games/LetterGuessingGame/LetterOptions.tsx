import { motion } from 'framer-motion';
import { useTheme } from '@/components/ui/theme';

interface LetterOptionsProps {
  options: string[];
  onSelect: (letter: string) => void;
  disabled: boolean;
  isShaking: boolean;
}

export function LetterOptions({ options, onSelect, disabled, isShaking }: LetterOptionsProps) {
  const { isDark, colorTheme } = useTheme();

  return (
    <motion.div 
      className="grid grid-cols-2 gap-4"
      animate={isShaking ? {
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      } : {}}
    >
      {options.map((letter, index) => (
        <motion.button
          key={`${letter}-${index}`}
          whileHover={disabled ? {} : { scale: 1.05 }}
          whileTap={disabled ? {} : { scale: 0.95 }}
          className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${
            isDark
              ? `bg-gray-700 text-white hover:bg-${colorTheme}/20`
              : `bg-gray-100 text-gray-800 hover:bg-${colorTheme}/10`
          }`}
          onClick={() => onSelect(letter)}
          disabled={disabled}
        >
          {letter}
        </motion.button>
      ))}
    </motion.div>
  );
}