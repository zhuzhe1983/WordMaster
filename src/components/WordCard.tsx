import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Heart, Share2, BookmarkPlus, Gamepad2 } from 'lucide-react';
import { Word } from '@/types';
import { Button } from './ui/Button';
import { useSettingsStore } from '@/store/settings';

interface WordCardProps {
  word: Word;
  onSwipe: (direction: 'up' | 'down') => void;
  onSave?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onGame?: () => void;
}

export function WordCard({ word, onSwipe, onSave, onLike, onShare, onGame }: WordCardProps) {
  const { settings } = useSettingsStore();
  const colorTheme = `macaron-${settings.colorTheme}`;

  return (
    <motion.div
      className={`w-full max-w-md ${
        settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-lg p-6 mx-auto`}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -50) onSwipe('up');
        else if (info.offset.y > 50) onSwipe('down');
      }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${
          settings.theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>{word.word}</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance(word.word);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
          }}
          className="rounded-full"
        >
          <Volume2 className={`w-5 h-5 text-${colorTheme}`} />
        </Button>
      </div>
      
      <p className={`${
        settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>{word.pronunciation}</p>
      <p className={`mt-2 ${
        settings.theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>{word.definition}</p>
      
      <div className="space-y-2 mt-4">
        {word.examples.map((example, index) => (
          <p key={index} className={`italic ${
            settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>"{example}"</p>
        ))}
      </div>

      {word.story && (
        <div className={`mt-4 p-4 rounded-lg ${
          settings.theme === 'dark' 
            ? `bg-${colorTheme}/20 text-gray-200` 
            : `bg-${colorTheme}/10 text-gray-700`
        }`}>
          <p>{word.story}</p>
        </div>
      )}

      <div className="flex justify-center mt-6 pt-4 border-t border-gray-700/10">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-2"
        >
          <BookmarkPlus className="w-4 h-4" />
          Save
        </Button>
      </div>
    </motion.div>
  );
}