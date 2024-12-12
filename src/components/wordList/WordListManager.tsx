import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, GraduationCap, BookOpen, Library, FileText, LayoutGrid, Upload } from 'lucide-react';
import { useWordListsStore } from '@/store/wordLists';
import { useI18nStore } from '@/store/i18n';
import { WordList, WordListCategory } from '@/types';
import { Button } from '../ui/Button';
import { WordListGrid } from './WordListGrid';
import { useTheme } from '../ui/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { DictionaryImporter } from '../DictionaryImporter';

const categoryIcons = {
  all: LayoutGrid,
  school: GraduationCap,
  dictionary: Book,
  exam: BookOpen,
  literature: Library,
  custom: FileText,
};

export function WordListManager() {
  const navigate = useNavigate();
  const { messages } = useI18nStore();
  const { lists, setActiveList } = useWordListsStore();
  const [selectedCategory, setSelectedCategory] = useState<WordListCategory>('all');
  const { isDark } = useTheme();

  const categories: WordListCategory[] = ['all', 'school', 'dictionary', 'exam', 'literature', 'custom'];
  
  const filteredLists = selectedCategory === 'all'
    ? lists
    : lists.filter((list) => list.category === selectedCategory);

  const handleStudy = (list: WordList) => {
    setActiveList(list.id);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className={`flex gap-2 overflow-x-auto pb-2 ${
        isDark ? 'scrollbar-dark' : 'scrollbar-light'
      }`}>
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2 whitespace-nowrap min-w-fit px-4"
            >
              <Icon className="w-4 h-4" />
              {messages.wordList.categories[category]}
            </Button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {selectedCategory === 'custom' && (
            <div className="mb-6 flex justify-end">
              <DictionaryImporter />
            </div>
          )}

          {filteredLists.length > 0 ? (
            <WordListGrid
              lists={filteredLists}
              onStudy={handleStudy}
            />
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {messages.wordList.empty}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}