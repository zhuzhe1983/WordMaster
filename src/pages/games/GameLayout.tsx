import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordListsStore } from '@/store/wordLists';
import { Button } from '@/components/ui/Button';
import { BookMarked } from 'lucide-react';
import { useTheme } from '@/components/ui/theme';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  const navigate = useNavigate();
  const { lists, activeListId, savedWords } = useWordListsStore();
  const { isDark } = useTheme();

  // Get current word list
  const currentList = activeListId 
    ? lists.find(list => list.id === activeListId)
    : savedWords.words.length > 0 
      ? { ...savedWords, words: savedWords.words }
      : null;

  if (!currentList || currentList.words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <div className="text-center space-y-2">
          <BookMarked className="w-12 h-12 text-macaron-pink mx-auto mb-4" />
          <h2 className={`text-xl font-semibold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            No words available
          </h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Please select a word list to start playing
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/word-lists')}
          className="flex items-center gap-2"
        >
          <BookMarked className="w-4 h-4" />
          Word Lists
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}