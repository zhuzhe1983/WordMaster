import { useNavigate } from 'react-router-dom';
import { WordPuzzle as WordPuzzleComponent } from '@/components/games/WordPuzzle';
import { GameLayout } from './GameLayout';
import { useWordListsStore } from '@/store/wordLists';

export function WordPuzzle() {
  const navigate = useNavigate();
  const { lists, activeListId, savedWords } = useWordListsStore();

  const currentList = activeListId 
    ? lists.find(list => list.id === activeListId)
    : savedWords.words.length > 0 
      ? { ...savedWords, words: savedWords.words }
      : null;

  const handleComplete = (score: number) => {
    // TODO: Save high score
    navigate('/games');
  };

  return (
    <GameLayout>
      {currentList && (
        <WordPuzzleComponent
          words={currentList.words}
          onComplete={handleComplete}
        />
      )}
    </GameLayout>
  );
}