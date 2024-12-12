import { BookOpen, Trophy, Users, Settings, Gamepad2, BookMarked } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18nStore } from '@/store/i18n';
import { useTheme } from '../ui/theme';

export function Sidebar() {
  const location = useLocation();
  const { messages } = useI18nStore();
  const { isDark, colorTheme } = useTheme();

  const links = [
    { icon: BookOpen, label: messages.nav.learn, path: '/' },
    { icon: BookMarked, label: messages.wordList.title, path: '/word-lists' },
    { icon: Gamepad2, label: messages.nav.games, path: '/games' },
    { icon: Trophy, label: messages.nav.achievements, path: '/achievements' },
    { icon: Users, label: messages.nav.friends, path: '/friends' },
    { icon: Settings, label: messages.nav.settings, path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/learn';
    }
    if (path === '/games') {
      return location.pathname === '/games' || location.search.includes('game=');
    }
    return location.pathname === path;
  };

  return (
    <div className={`hidden md:flex flex-col w-64 theme-transition ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } border-r border-gray-200 dark:border-gray-700 p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className={`w-8 h-8 text-${colorTheme}`} />
        <h1 className="text-xl font-bold">WordMaster</h1>
      </div>

      <nav className="space-y-1">
        {links.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive(path)
                ? `bg-${colorTheme} text-white dark:text-white`
                : `hover:bg-${colorTheme}/10 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}