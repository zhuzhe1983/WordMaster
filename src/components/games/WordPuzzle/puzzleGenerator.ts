interface PuzzleResult {
  grid: string[][];
  positions: {
    word: string;
    start: number[];
    end: number[];
  }[];
}

export function generatePuzzle(words: string[]): PuzzleResult {
  // Sort words by length (longest first)
  const sortedWords = [...words].sort((a, b) => b.length - a.length);
  
  // Initialize grid size based on longest word
  const size = Math.max(
    sortedWords[0].length + 2,
    Math.min(15, Math.ceil(Math.sqrt(words.join('').length * 1.5)))
  );
  
  // Create empty grid
  const grid: string[][] = Array(size).fill(null)
    .map(() => Array(size).fill(''));
  
  const positions: {
    word: string;
    start: number[];
    end: number[];
  }[] = [];

  // Place words
  sortedWords.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      // Try random position and direction
      const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlaceWord(grid, word, row, col, direction)) {
        placeWord(grid, word, row, col, direction);
        positions.push({
          word,
          start: [row, col],
          end: getEndPosition(row, col, word.length, direction)
        });
        placed = true;
      }

      attempts++;
    }
  });

  // Fill empty spaces with random letters
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!grid[i][j]) {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, positions };
}

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: number
): boolean {
  const size = grid.length;
  const length = word.length;

  // Check if word fits in grid
  if (direction === 0) { // horizontal
    if (col + length > size) return false;
  } else if (direction === 1) { // vertical
    if (row + length > size) return false;
  } else { // diagonal
    if (col + length > size || row + length > size) return false;
  }

  // Check if path is clear or has matching letters
  for (let i = 0; i < length; i++) {
    let currentRow = row;
    let currentCol = col;

    if (direction === 0) currentCol += i;
    else if (direction === 1) currentRow += i;
    else {
      currentRow += i;
      currentCol += i;
    }

    const currentCell = grid[currentRow][currentCol];
    if (currentCell && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: number
): void {
  for (let i = 0; i < word.length; i++) {
    if (direction === 0) grid[row][col + i] = word[i];
    else if (direction === 1) grid[row + i][col] = word[i];
    else grid[row + i][col + i] = word[i];
  }
}

function getEndPosition(
  startRow: number,
  startCol: number,
  length: number,
  direction: number
): number[] {
  if (direction === 0) return [startRow, startCol + length - 1];
  if (direction === 1) return [startRow + length - 1, startCol];
  return [startRow + length - 1, startCol + length - 1];
}