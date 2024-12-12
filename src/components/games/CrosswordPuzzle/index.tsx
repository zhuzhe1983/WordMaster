```typescript
import { useState, useEffect } from 'react';
import { Word } from '@/types';
import { CrosswordGrid } from './CrosswordGrid';
import { ClueList } from './ClueList';
import { GameProgress } from './GameProgress';
import { useTheme } from '@/components/ui/theme';
import { generateCrossword } from './crosswordGenerator';
import confetti from 'canvas-confetti';

interface CrosswordPuzzleProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function CrosswordPuzzle({ words, onComplete }: CrosswordPuzzleProps) {
  const { isDark } = useTheme();
  const [puzzle, setPuzzle] = useState<{
    grid: string[][];
    clues: {
      word: string;
      clue: string;
      row: number;
      col: number;
      direction: 'across' | 'down';
      number: number;
    }[];
  } | null>(null);
  const [userInput, setUserInput] = useState<string[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Select random words and generate crossword
    const selectedWords = words
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map(w => ({
        word: w.word.toUpperCase(),
        clue: w.definition
      }));
    
    const newPuzzle = generateCrossword(selectedWords);
    setPuzzle(newPuzzle);
    
    // Initialize empty user input grid
    setUserInput(
      Array(newPuzzle.grid.length)
        .fill(null)
        .map(() => Array(newPuzzle.grid[0].length).fill(''))
    );
  }, [words]);

  const handleCellInput = (row: number, col: number, value: string) => {
    if (!puzzle) return;

    const newInput = [...userInput];
    newInput[row][col] = value.toUpperCase();
    setUserInput(newInput);

    // Check if any words are completed
    puzzle.clues.forEach(clue => {
      if (!completedWords.has(clue.word)) {
        const isComplete = checkWord(clue, newInput);
        if (isComplete) {
          setCompletedWords(new Set([...completedWords, clue.word]));
          setScore(prev => prev + clue.word.length * 10);
          
          confetti({
            particleCount: 30,
            spread: 40,
            origin: { y: 0.6 }
          });

          // Check if puzzle is complete
          if (completedWords.size === puzzle.clues.length - 1) {
            setTimeout(() => {
              onComplete(score + clue.word.length * 10);
            }, 1000);
          }
        }
      }
    });

    // Move to next cell
    moveToNextCell(row, col);
  };

  const checkWord = (clue: typeof puzzle.clues[0], input: string[][]) => {
    const letters = [];
    let { row, col } = clue;
    const length = clue.word.length;

    for (let i = 0; i < length; i++) {
      if (clue.direction === 'across') {
        letters.push(input[row][col + i]);
      } else {
        letters.push(input[row + i][col]);
      }
    }

    return letters.join('') === clue.word;
  };

  const moveToNextCell = (row: number, col: number) => {
    if (!puzzle) return;

    if (direction === 'across' && col < puzzle.grid[0].length - 1) {
      setSelectedCell([row, col + 1]);
    } else if (direction === 'down' && row < puzzle.grid.length - 1) {
      setSelectedCell([row + 1, col]);
    }
  };

  if (!puzzle) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-xl p-6 shadow-lg`}>
        <GameProgress
          completedWords={completedWords.size}
          totalWords={puzzle.clues.length}
          score={score}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <CrosswordGrid
              puzzle={puzzle.grid}
              userInput={userInput}
              selectedCell={selectedCell}
              direction={direction}
              onCellSelect={setSelectedCell}
              onDirectionChange={setDirection}
              onCellInput={handleCellInput}
              completedWords={completedWords}
            />
          </div>
          <div>
            <ClueList
              clues={puzzle.clues}
              completedWords={completedWords}
              onClueSelect={(row, col) => {
                setSelectedCell([row, col]);
                setDirection('across');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```