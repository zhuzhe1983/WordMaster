import { BookOpen, Trophy, Users, Settings, Gamepad2, BookMarked } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18nStore } from '@/store/i18n';
import { useSettingsStore } from '@/store/settings';

export function Sidebar() {
  const location = useLocation();
  const { messages } = useI18nStore();
  const { settings } = useSettingsStore();
  const colorTheme = `macaron-${settings.colorTheme}`;

  const links = [
    { icon: BookOpen, label: messages.nav.learn, path: '/' },
    { icon: BookMarked, label: messages.wordList.title, path: '/word-lists' },
    { icon: Gamepad2, label: messages.nav.games, path: '/games' },
    { icon: Trophy, label: messages.nav.achievements, path: '/achievements' },
    { icon: Users, label: messages.nav.friends, path: '/friends' },
    { icon: Settings, label: messages.nav.settings, path: '/settings' },
  ];

  return (
    <div className={`hidden md:flex flex-col w-64 theme-transition ${
      settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } border-r border-gray-200 dark:border-gray-700 p-4`}>
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className={`w-8 h-8 text-${colorTheme}`} />
        <h1 className="text-xl font-bold theme-transition">WordMaster</h1>
      </div>

      <nav className="space-y-2">
        {links.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === path
                ? `bg-${colorTheme} text-white`
                : `text-gray-600 dark:text-gray-300 hover:bg-${colorTheme}/10`
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