import { useNavigate } from 'react-router-dom';
import { SpaceShooterGame as SpaceShooterGameComponent } from '@/components/games/SpaceShooterGame';
import { GameLayout } from './GameLayout';
import { useWordListsStore } from '@/store/wordLists';

export function SpaceShooterGame() {
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
        <SpaceShooterGameComponent
          words={currentList.words}
          onComplete={handleComplete}
        />
      )}
    </GameLayout>
  );
}