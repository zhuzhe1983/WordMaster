import { useState, useEffect } from 'react';
import { Word } from '@/types';
import { LetterBox } from './LetterBox';
import { LetterOptions } from './LetterOptions';
import { GameProgress } from './GameProgress';
import { useTheme } from '@/components/ui/theme';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LetterGuessingGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function LetterGuessingGame({ words, onComplete }: LetterGuessingGameProps) {
  const { isDark } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [hiddenLetter, setHiddenLetter] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const currentWord = words[currentWordIndex];

  // Read the word when it changes
  useEffect(() => {
    if (!currentWord) return;

    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }, [currentWord]);

  useEffect(() => {
    if (!currentWord) return;

    // Find all unique letters in the word
    const letters = Array.from(new Set(currentWord.word.toLowerCase()));
    
    // Randomly select one letter to hide
    const letterToHide = letters[Math.floor(Math.random() * letters.length)];
    setHiddenLetter(letterToHide);

    // Generate options including the correct letter
    const alphabetPool = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const wrongOptions = alphabetPool
      .filter(l => l !== letterToHide && !currentWord.word.toLowerCase().includes(l))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    setOptions([letterToHide, ...wrongOptions].sort(() => Math.random() - 0.5));
    setIsCorrect(null);
    setIsShaking(false);
  }, [currentWord]);

  const handleGuess = (letter: string) => {
    const correct = letter === hiddenLetter;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      // Move to next word after a delay
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
        } else {
          onComplete(score + 10);
        }
      }, 1000);
    } else {
      // Shake effect for wrong answer
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setIsCorrect(null); // Reset for next try

      // Read the whole word when answer is wrong
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-xl p-6 shadow-lg`}>
        <GameProgress
          currentWord={currentWordIndex + 1}
          totalWords={words.length}
          score={score}
        />

        <div className="mt-8 mb-12">
          <p className={`text-center mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {currentWord.definition}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center gap-2"
            >
              {currentWord.word.split('').map((letter, index) => (
                <LetterBox
                  key={`${index}-${letter}`}
                  letter={letter}
                  isHidden={letter.toLowerCase() === hiddenLetter}
                  isCorrect={isCorrect}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <LetterOptions
          options={options}
          onSelect={handleGuess}
          disabled={isCorrect === true}
          isShaking={isShaking}
        />
      </div>
    </div>
  );
}