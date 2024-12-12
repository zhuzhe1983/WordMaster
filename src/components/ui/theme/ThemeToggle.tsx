import { Moon, Sun } from 'lucide-react';
import { Button } from '../Button';
import { useSettingsStore } from '@/store/settings';
import { useI18nStore } from '@/store/i18n';

export function ThemeToggle() {
  const { settings, updateSettings } = useSettingsStore();
  const { messages } = useI18nStore();

  return (
    <div className="flex gap-4">
      <Button
        variant={settings.theme === 'light' ? 'primary' : 'outline'}
        onClick={() => updateSettings({ theme: 'light' })}
        className="flex items-center gap-2"
      >
        <Sun className="w-4 h-4" />
        {messages.settings.themes.light}
      </Button>
      <Button
        variant={settings.theme === 'dark' ? 'primary' : 'outline'}
        onClick={() => updateSettings({ theme: 'dark' })}
        className="flex items-center gap-2"
      >
        <Moon className="w-4 h-4" />
        {messages.settings.themes.dark}
      </Button>
    </div>
  );
}