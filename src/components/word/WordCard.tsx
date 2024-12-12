import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWordCardAnimation } from '@/hooks/useWordCardAnimation';
import { WordCardHeader } from './WordCardHeader';
import { WordCardContent } from './WordCardContent';
import { WordCardActions } from './WordCardActions';
import { WordCardOverlay } from './WordCardOverlay';
import { Word } from '@/types';
import { useTheme } from '../ui/theme';

interface WordCardProps {
  word: Word;
  onSwipe: (direction: 'up' | 'down') => void;
  onSave?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onGame?: () => void;
}

export function WordCard({ word, onSwipe, ...actions }: WordCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const { isDark } = useTheme();
  const { handleDragEnd, dragDirection, cardVariants } = useWordCardAnimation(onSwipe);

  useEffect(() => {
    const readWord = () => {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    };

    readWord();
    const timer1 = setTimeout(readWord, 1000);
    const timer2 = setTimeout(readWord, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      speechSynthesis.cancel();
    };
  }, [word]);

  const handlePressStart = () => {
    const timer = setTimeout(() => setShowActions(true), 500);
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <motion.div
      className={`w-full rounded-xl shadow-lg overflow-hidden relative ${
        word.imageUrl ? '' : isDark ? 'bg-gray-800' : 'bg-white'
      }`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      custom={dragDirection}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
    >
      {word.imageUrl && <WordCardOverlay imageUrl={word.imageUrl} />}

      <div className="relative z-10 p-6">
        <WordCardHeader word={word} />
        <WordCardContent word={word} />
        <WordCardActions onSave={actions.onSave} />
      </div>

      <WordCardOverlay
        show={showActions}
        onClose={() => setShowActions(false)}
        actions={actions}
      />
    </motion.div>
  );
}