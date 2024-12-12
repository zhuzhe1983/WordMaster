import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ui/theme';

interface PuzzleGridProps {
  puzzle: string[][];
  onWordFound: (word: string, cells: number[][]) => void;
  selectedCells: number[][];
}

export function PuzzleGrid({ puzzle, onWordFound, selectedCells }: PuzzleGridProps) {
  const { isDark, colorTheme } = useTheme();
  const [dragStart, setDragStart] = useState<number[]>([]);
  const [dragEnd, setDragEnd] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging && dragStart.length && dragEnd.length) {
      const word = getWordFromSelection();
      if (word.length > 2) {
        const cells = getSelectedCells();
        onWordFound(word, cells);
      }
      setDragStart([]);
      setDragEnd([]);
    }
  }, [isDragging]);

  const getWordFromSelection = () => {
    if (!dragStart.length || !dragEnd.length) return '';

    const [startRow, startCol] = dragStart;
    const [endRow, endCol] = dragEnd;
    let word = '';

    // Horizontal
    if (startRow === endRow) {
      const start = Math.min(startCol, endCol);
      const end = Math.max(startCol, endCol);
      word = puzzle[startRow].slice(start, end + 1).join('');
    }
    // Vertical
    else if (startCol === endCol) {
      const start = Math.min(startRow, endRow);
      const end = Math.max(startRow, endRow);
      word = puzzle.slice(start, end + 1).map(row => row[startCol]).join('');
    }
    // Diagonal
    else {
      const rowStep = endRow > startRow ? 1 : -1;
      const colStep = endCol > startCol ? 1 : -1;
      let row = startRow;
      let col = startCol;
      while (row !== endRow + rowStep) {
        word += puzzle[row][col];
        row += rowStep;
        col += colStep;
      }
    }

    return word;
  };

  const getSelectedCells = () => {
    const cells: number[][] = [];
    const [startRow, startCol] = dragStart;
    const [endRow, endCol] = dragEnd;

    if (startRow === endRow) {
      const start = Math.min(startCol, endCol);
      const end = Math.max(startCol, endCol);
      for (let col = start; col <= end; col++) {
        cells.push([startRow, col]);
      }
    } else if (startCol === endCol) {
      const start = Math.min(startRow, endRow);
      const end = Math.max(startRow, endRow);
      for (let row = start; row <= end; row++) {
        cells.push([row, startCol]);
      }
    } else {
      const rowStep = endRow > startRow ? 1 : -1;
      const colStep = endCol > startCol ? 1 : -1;
      let row = startRow;
      let col = startCol;
      while (row !== endRow + rowStep) {
        cells.push([row, col]);
        row += rowStep;
        col += colStep;
      }
    }

    return cells;
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="grid gap-1 p-4 bg-opacity-50 rounded-lg select-none"
      style={{ 
        gridTemplateColumns: `repeat(${puzzle[0]?.length || 0}, minmax(0, 1fr))` 
      }}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {puzzle.map((row, rowIndex) => (
        row.map((letter, colIndex) => (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              font-bold text-lg cursor-pointer
              ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
              ${isCellSelected(rowIndex, colIndex) ? `bg-${colorTheme}` : ''}
            `}
            whileHover={{ scale: 1.1 }}
            onMouseDown={() => {
              setDragStart([rowIndex, colIndex]);
              setIsDragging(true);
            }}
            onMouseEnter={() => {
              if (isDragging) {
                setDragEnd([rowIndex, colIndex]);
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => {
              setDragStart([rowIndex, colIndex]);
              setIsDragging(true);
            }}
            onTouchMove={(e) => {
              if (isDragging) {
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                const cell = element?.getAttribute('data-cell');
                if (cell) {
                  const [row, col] = cell.split('-').map(Number);
                  setDragEnd([row, col]);
                }
              }
            }}
            onTouchEnd={() => setIsDragging(false)}
            data-cell={`${rowIndex}-${colIndex}`}
          >
            <span className={isCellSelected(rowIndex, colIndex) ? 'text-white' : (
              isDark ? 'text-white' : 'text-gray-800'
            )}>
              {letter}
            </span>
          </motion.div>
        ))
      ))}
    </div>
  );
}