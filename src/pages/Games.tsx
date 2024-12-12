import { useNavigate } from 'react-router-dom';
import { Gamepad2, Keyboard, Rocket, Grid2x2, HelpCircle } from 'lucide-react';
import { useI18nStore } from '@/store/i18n';
import { useTheme } from '@/components/ui/theme';

export function Games() {
  const navigate = useNavigate();
  const { messages } = useI18nStore();
  const { isDark, colorTheme } = useTheme();

  const games = [
    {
      id: 'typing',
      name: messages.games.typing.name,
      description: messages.games.typing.description,
      icon: Keyboard,
      path: '/games/typing'
    },
    {
      id: 'shooter',
      name: messages.games.shooter.name,
      description: messages.games.shooter.description,
      icon: Rocket,
      path: '/games/shooter'
    },
    {
      id: 'puzzle',
      name: messages.games.puzzle.name,
      description: messages.games.puzzle.description,
      icon: Grid2x2,
      path: '/games/puzzle'
    },
    {
      id: 'guessing',
      name: messages.games.guessing.name,
      description: messages.games.guessing.description,
      icon: HelpCircle,
      path: '/games/guessing'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Gamepad2 className={`w-8 h-8 text-${colorTheme}`} />
        <h1 className={`text-3xl font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>{messages.games.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-xl shadow-sm hover:shadow-md transition-all group`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-${colorTheme}/10 text-${colorTheme} group-hover:bg-${colorTheme} group-hover:text-white transition-colors`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className={`text-xl font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>{game.name}</h2>
              </div>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {game.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}