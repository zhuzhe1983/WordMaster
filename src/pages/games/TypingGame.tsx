import { useNavigate } from 'react-router-dom';
import { TypingGame as TypingGameComponent } from '@/components/games/TypingGame';
import { GameLayout } from './GameLayout';
import { useWordListsStore } from '@/store/wordLists';

export function TypingGame() {
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
        <TypingGameComponent
          words={currentList.words}
          onComplete={handleComplete}
        />
      )}
    </GameLayout>
  );
}