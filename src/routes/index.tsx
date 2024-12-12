import { Routes, Route } from 'react-router-dom';
import { Learn } from '../pages/Learn';
import { Games } from '../pages/Games';
import { TypingGame } from '../pages/games/TypingGame';
import { SpaceShooterGame } from '../pages/games/SpaceShooterGame';
import { WordPuzzle } from '../pages/games/WordPuzzle';
import { LetterGuessingGame } from '../pages/games/LetterGuessingGame';
import { Achievements } from '../pages/Achievements';
import { Friends } from '../pages/Friends';
import { Settings } from '../pages/Settings';
import { WordLists } from '../pages/WordLists';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Learn />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/word-lists" element={<WordLists />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/typing" element={<TypingGame />} />
      <Route path="/games/shooter" element={<SpaceShooterGame />} />
      <Route path="/games/puzzle" element={<WordPuzzle />} />
      <Route path="/games/guessing" element={<LetterGuessingGame />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}