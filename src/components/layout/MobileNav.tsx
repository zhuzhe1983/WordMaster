import { useState } from 'react';
import { Menu, X, BookOpen, Trophy, Users, Settings, Gamepad2, BookMarked } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18nStore } from '@/store/i18n';
import { useTheme } from '../ui/theme';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="md:hidden">
      <div className={`fixed top-0 left-0 right-0 h-16 z-40 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } border-b border-gray-200 dark:border-gray-700 px-4 flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-2">
          <BookOpen className={`w-6 h-6 text-${colorTheme}`} />
          <span className="text-lg font-bold">WordMaster</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className={`fixed top-16 right-0 bottom-0 w-64 z-40 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } border-l border-gray-200 dark:border-gray-700 shadow-lg`}
            >
              <nav className="py-2">
                {links.map(({ icon: Icon, label, path }) => {
                  const isActive = location.pathname === path || 
                    (path === '/' && location.pathname === '/learn');
                  
                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                        isActive
                          ? `bg-${colorTheme} text-white`
                          : `hover:bg-${colorTheme}/10 ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}