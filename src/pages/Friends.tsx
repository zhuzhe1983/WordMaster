import { useState } from 'react';
import { User } from '@/types';
import { Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/ui/theme';

const sampleFriends: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    progress: {
      wordsLearned: 250,
      streak: 15,
      level: 8
    },
    wordLists: []
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    progress: {
      wordsLearned: 180,
      streak: 7,
      level: 6
    },
    wordLists: []
  }
];

export function Friends() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark, colorTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>Friends</h1>
        <Button variant="primary" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Friend
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        } w-5 h-5`} />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-${colorTheme} focus:border-transparent`}
        />
      </div>

      <div className="grid gap-4">
        {sampleFriends.map((friend) => (
          <div
            key={friend.id}
            className={`${
              isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-4">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>{friend.name}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  Level {friend.progress.level} • {friend.progress.wordsLearned} words learned
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                View Progress
              </Button>
              <Button variant="secondary" size="sm">
                Share List
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}