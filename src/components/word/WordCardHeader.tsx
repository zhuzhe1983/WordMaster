import { Volume2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../ui/theme';
import { Word } from '@/types';

interface WordCardHeaderProps {
  word: Word;
}

export function WordCardHeader({ word }: WordCardHeaderProps) {
  const { isDark } = useTheme();

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className={`text-2xl font-bold ${
        isDark ? 'text-white' : 'text-gray-800'
      } ${word.imageUrl ? 'text-shadow' : ''}`}>
        {word.word}
      </h2>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSpeak}
        className="rounded-full"
      >
        <Volume2 className="w-5 h-5" />
      </Button>
    </div>
  );
}