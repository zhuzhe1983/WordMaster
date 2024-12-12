import { useState, useEffect } from 'react';
import { Word } from '@/types';
import { PuzzleGrid } from './PuzzleGrid';
import { WordList } from './WordList';
import { GameProgress } from './GameProgress';
import { useTheme } from '@/components/ui/theme';
import { generatePuzzle } from './puzzleGenerator';
import confetti from 'canvas-confetti';

interface WordPuzzleProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function WordPuzzle({ words, onComplete }: WordPuzzleProps) {
  const { isDark } = useTheme();
  const [puzzle, setPuzzle] = useState<string[][]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);

  useEffect(() => {
    // Select 6 random words from the list
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);
    setSelectedWords(selected);

    // Generate puzzle grid
    const { grid } = generatePuzzle(selected.map(w => w.word));
    setPuzzle(grid);
  }, [words]);

  const handleWordFound = (word: string, cells: number[][]) => {
    if (!foundWords.has(word)) {
      setFoundWords(new Set([...foundWords, word]));
      setScore(prev => prev + word.length * 10);
      setSelectedCells(cells);

      // Celebration effect
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.6 }
      });

      // Check if all words are found
      if (foundWords.size === selectedWords.length - 1) {
        setTimeout(() => {
          onComplete(score + word.length * 10);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-xl p-6 shadow-lg`}>
        <GameProgress
          foundWords={foundWords.size}
          totalWords={selectedWords.length}
          score={score}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <PuzzleGrid
              puzzle={puzzle}
              onWordFound={handleWordFound}
              selectedCells={selectedCells}
            />
          </div>
          <div>
            <WordList
              words={selectedWords}
              foundWords={foundWords}
            />
          </div>
        </div>
      </div>
    </div>
  );
}