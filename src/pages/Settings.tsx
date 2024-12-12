import { useI18nStore } from '@/store/i18n';
import { Globe } from 'lucide-react';
import { ThemeToggle, ColorThemePicker } from '@/components/ui/theme';

export function Settings() {
  const { locale, setLocale, messages } = useI18nStore();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{messages.settings.title}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{messages.settings.language}</h2>
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-macaron-pink dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="en-US">English</option>
              <option value="zh-CN">中文</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{messages.settings.theme}</h2>
          <ThemeToggle />
        </div>

        <ColorThemePicker />
      </div>
    </div>
  );
}