import { useEffect, useRef, useState, useCallback } from 'react';
import { Word } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useTheme } from '../ui/theme';

interface SpaceShooterGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

interface Block {
  id: string;
  letter: string;
  x: number;
  y: number;
  isHit: boolean;
  isHighlighted: boolean;
}

interface Bullet {
  id: string;
  x: number;
  y: number;
  targetY: number;
}

export function SpaceShooterGame({ words, onComplete }: SpaceShooterGameProps) {
  const { colorTheme, isDark } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [hitEffects, setHitEffects] = useState<{ x: number; y: number }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentWord = words[currentWordIndex]?.word || '';

  // Initialize blocks for current word
  useEffect(() => {
    if (!gameAreaRef.current) return;
    const containerWidth = gameAreaRef.current.clientWidth;
    const letterWidth = 40;
    const wordLength = currentWord.length;
    const totalWidth = letterWidth * wordLength;
    const startX = (containerWidth - totalWidth) / 2;

    const newBlocks = currentWord.split('').map((letter, index) => ({
      id: `block-${index}`,
      letter,
      x: (startX + index * letterWidth) / containerWidth * 100,
      y: 20,
      isHit: false,
      isHighlighted: index === 0
    }));

    setBlocks(newBlocks);
    setTypedLetters('');
    setBullets([]);
    setHitEffects([]);

    // Auto-read the word
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);

    inputRef.current?.focus();
  }, [currentWord]);

  // Animate bullets and check for hits
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets(prev => {
        const newBullets = prev.map(bullet => ({
          ...bullet,
          y: bullet.y + 2
        })).filter(bullet => {
          // Check if bullet has reached its target
          if (bullet.y >= bullet.targetY) {
            // Find corresponding block
            const blockIndex = parseInt(bullet.id.split('-')[1]);
            const block = blocks[blockIndex];
            
            if (block && !block.isHit) {
              // Mark block as hit
              setBlocks(prev => prev.map((b, i) => 
                i === blockIndex ? { ...b, isHit: true } : b
              ));
              
              // Add hit effect
              setHitEffects(prev => [...prev, { x: block.x, y: block.y }]);
            }
            return false;
          }
          return true;
        });
        return newBullets;
      });

      setHitEffects(prev => prev.filter((_, i) => i > prev.length - 5));
    }, 16);

    return () => clearInterval(interval);
  }, [blocks]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const nextLetter = currentWord[typedLetters.length]?.toLowerCase();
    const pressedKey = e.key.toLowerCase();

    if (pressedKey === nextLetter) {
      const targetBlock = blocks[typedLetters.length];
      if (!targetBlock) return;

      // Add bullet from bottom center
      setBullets(prev => [...prev, {
        id: `bullet-${typedLetters.length}`,
        x: targetBlock.x,
        y: 0,
        targetY: targetBlock.y
      }]);

      setTypedLetters(prev => prev + pressedKey);
      setScore(prev => prev + 10);

      if (typedLetters.length + 1 === currentWord.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setCurrentWordIndex(prev => (prev + 1) % words.length);
        }, 1000);
      }
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  }, [currentWord, typedLetters, gameStarted, words.length, blocks]);

  // Highlight next letter to type
  useEffect(() => {
    setBlocks(prev => prev.map((block, index) => ({
      ...block,
      isHighlighted: index === typedLetters.length
    })));
  }, [typedLetters]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-xl p-6 shadow-lg`}>
        <div
          ref={gameAreaRef}
          className={`relative w-full h-80 border-2 rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
          } ${isShaking ? 'animate-shake' : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Blocks */}
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 1 }}
              animate={{
                opacity: block.isHit ? 0 : 1,
                scale: block.isHit ? 0 : 1
              }}
              className={`absolute w-10 h-10 flex items-center justify-center ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              } rounded`}
              style={{
                left: `${block.x}%`,
                top: `${block.y}%`,
                transform: 'translate(-50%, -50%)',
                display: block.isHit ? 'none' : 'flex',
              }}
            >
              <span className={`text-xl font-bold ${
                block.isHighlighted
                  ? `text-${colorTheme} animate-pulse`
                  : isDark ? 'text-white' : 'text-gray-800'
              }`}>{block.letter}</span>
            </motion.div>
          ))}

          {/* Hit Effects */}
          {hitEffects.map((effect, index) => (
            <motion.div
              key={`hit-${index}`}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute w-10 h-10 rounded-full bg-${colorTheme}`}
              style={{
                left: `${effect.x}%`,
                top: `${effect.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Bullets */}
          {bullets.map((bullet) => (
            <motion.div
              key={bullet.id}
              className={`absolute w-1 h-4 bg-${colorTheme} rounded-full`}
              style={{
                left: `${bullet.x}%`,
                bottom: `${bullet.y}%`,
                transform: 'translate(-50%, 0)',
              }}
            />
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={typedLetters}
          onChange={() => {}}
          onKeyPress={handleKeyPress}
          className="opacity-0 absolute"
          autoFocus
        />

        {!gameStarted && (
          <p className={`text-center mt-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Start typing to begin! Type each letter to shoot the blocks.
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

        .animate-pulse {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}