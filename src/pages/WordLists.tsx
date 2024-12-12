import { useEffect } from 'react';
import { useWordListsStore } from '@/store/wordLists';
import { useI18nStore } from '@/store/i18n';
import { useSettingsStore } from '@/store/settings';
import { WordListManager } from '@/components/wordList/WordListManager';
import { BookMarked } from 'lucide-react';

export function WordLists() {
  const { messages } = useI18nStore();
  const { settings } = useSettingsStore();
  const { initializeLists } = useWordListsStore();

  useEffect(() => {
    initializeLists();
  }, [initializeLists]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BookMarked className={`w-8 h-8 text-macaron-${settings.colorTheme}`} />
        <h1 className={`text-3xl font-bold ${
          settings.theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>{messages.wordList.title}</h1>
      </div>

      <div className={`${
        settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-xl shadow-sm p-6`}>
        <WordListManager />
      </div>
    </div>
  );
}