import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { CardStack } from '@/components/word/CardStack';
import { WordCard } from '@/components/word/WordCard';
import { TypingGame } from '@/components/games/TypingGame';
import { SpaceShooterGame } from '@/components/games/SpaceShooterGame';
import { WordPuzzle } from '@/components/games/WordPuzzle';
import { LetterGuessingGame } from '@/components/games/LetterGuessingGame';
import { useSettingsStore } from '@/store/settings';
import { useWordListsStore } from '@/store/wordLists';
import { useI18nStore } from '@/store/i18n';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/Button';
import { BookMarked } from 'lucide-react';
import { useTheme } from '@/components/ui/theme';

export function Learn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const gameMode = searchParams.get('game');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [gameScore, setGameScore] = useState<number | null>(null);
  const { settings } = useSettingsStore();
  const { lists, activeListId, savedWords } = useWordListsStore();
  const { messages } = useI18nStore();
  const { progress, goal, incrementProgress } = useProgress();
  const { isDark } = useTheme();

  // Get current word list
  const currentList = activeListId 
    ? lists.find(list => list.id === activeListId)
    : savedWords.words.length > 0 
      ? { ...savedWords, words: savedWords.words }
      : null;

  const words = currentList?.words || [];

  // Redirect to word lists if no active list
  useEffect(() => {
    if (!currentList) {
      navigate('/word-lists');
    }
  }, [currentList, navigate]);

  if (!currentList || words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <div className="text-center space-y-2">
          <BookMarked className="w-12 h-12 text-macaron-pink mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {messages?.wordList?.empty || 'No words available'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {messages?.wordList?.empty || 'Please select a word list to start learning'}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/word-lists')}
          className="flex items-center gap-2"
        >
          <BookMarked className="w-4 h-4" />
          {messages?.settings?.wordLists || 'Word Lists'}
        </Button>
      </div>
    );
  }

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && words.length > 0) {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      incrementProgress();
    }
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    incrementProgress();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {(!gameMode || gameMode === 'cards') && words[currentWordIndex] && (
          <CardStack currentIndex={currentWordIndex}>
            <WordCard
              word={words[currentWordIndex]}
              onSwipe={handleSwipe}
              onSave={() => {}}
              onLike={() => {}}
              onShare={() => {}}
              onGame={() => navigate('/games')}
            />
          </CardStack>
        )}

        {gameMode === 'typing' && (
          <TypingGame
            words={words}
            onComplete={handleGameComplete}
          />
        )}

        {gameMode === 'shooter' && (
          <SpaceShooterGame
            words={words}
            onComplete={handleGameComplete}
          />
        )}

        {gameMode === 'puzzle' && (
          <WordPuzzle
            words={words}
            onComplete={handleGameComplete}
          />
        )}

        {gameMode === 'guessing' && (
          <LetterGuessingGame
            words={words}
            onComplete={handleGameComplete}
          />
        )}

        {gameScore !== null && (
          <div className="mt-8 p-4 bg-macaron-pink/20 rounded-lg text-center">
            <h3 className="font-semibold mb-2 dark:text-white">Game Score</h3>
            <p className="text-2xl font-bold text-macaron-pink">{gameScore}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <div className={`px-4 py-2 rounded-full ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <span className={isDark ? 'text-white' : 'text-gray-800'}>
            {progress} / {goal}
          </span>
        </div>
      </div>
    </div>
  );
}