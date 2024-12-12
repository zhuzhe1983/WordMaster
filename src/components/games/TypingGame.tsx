import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Word } from '@/types';
import { useTheme } from '../ui/theme';
import { Progress } from '../ui/Progress';

interface TypingGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function TypingGame({ words, onComplete }: TypingGameProps) {
  const { colorTheme, isDark } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isShaking, setIsShaking] = useState(false);

  const currentWord = words[currentWordIndex]?.word.toLowerCase();

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    const value = e.target.value.toLowerCase();
    
    // Check if the input matches the current word up to this point
    if (currentWord.startsWith(value)) {
      setInput(value);
      
      // If the word is complete
      if (value === currentWord) {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Update score and move to next word
        setScore((prev) => prev + currentWord.length);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setInput('');

        // Auto-read the next word
        const nextWord = words[(currentWordIndex + 1) % words.length]?.word;
        if (nextWord) {
          const utterance = new SpeechSynthesisUtterance(nextWord);
          utterance.lang = 'en-US';
          speechSynthesis.speak(utterance);
        }
      }
    } else {
      // Incorrect input - trigger shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }, [currentWord, gameStarted, words.length, currentWordIndex]);

  // Auto-read the word when it first appears
  useEffect(() => {
    if (currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  }, [currentWord]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      onComplete(score);
    }
  }, [gameStarted, timeLeft, score, onComplete]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-xl p-8 shadow-lg`}>
        <div className="flex justify-between items-center mb-8">
          <div className={`text-2xl font-bold text-${colorTheme}`}>Score: {score}</div>
          <div className={`text-xl font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Time: {timeLeft}s</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <h2 className={`text-4xl font-bold ${
              isDark ? 'text-white' : 'text-gray-800'
            } mb-2`}>
              {words[currentWordIndex]?.word}
            </h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {words[currentWordIndex]?.definition}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="relative">
          <motion.div
            animate={isShaking ? {
              x: [-10, 10, -10, 10, 0],
              transition: { duration: 0.4 }
            } : {}}
          >
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className={`w-full px-4 py-3 text-lg rounded-lg border-2 border-${colorTheme} focus:outline-none focus:border-${colorTheme} transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-800'
              }`}
              placeholder="Type the word..."
              autoFocus
            />
          </motion.div>
          <Progress
            value={input.length}
            max={currentWord?.length || 1}
            className="mt-2"
          />
        </div>

        {!gameStarted && (
          <p className={`text-center mt-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Start typing to begin the game!
          </p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}