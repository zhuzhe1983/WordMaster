import { Volume2 } from 'lucide-react';
import { Word } from '@/types';
import { Button } from '../ui/Button';

interface WordContentProps {
  word: Word;
}

export function WordContent({ word }: WordContentProps) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{word.word}</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={speak}
          className="rounded-full"
        >
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-gray-600">{word.pronunciation}</p>
      <p className="text-gray-800">{word.definition}</p>

      <div className="space-y-2">
        {word.examples.map((example, index) => (
          <p key={index} className="text-gray-700 italic">"{example}"</p>
        ))}
      </div>

      {word.story && (
        <div className="p-4 bg-macaron-pink/20 rounded-lg">
          <p className="text-gray-700">{word.story}</p>
        </div>
      )}
    </div>
  );
}