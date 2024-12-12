import { Palette } from 'lucide-react';
import { useSettingsStore, ColorTheme } from '@/store/settings';

const colorThemes: { value: ColorTheme; label: string; class: string }[] = [
  { value: 'pink', label: 'Pink', class: 'bg-macaron-pink' },
  { value: 'mint', label: 'Mint', class: 'bg-macaron-mint' },
  { value: 'lavender', label: 'Lavender', class: 'bg-macaron-lavender' },
  { value: 'yellow', label: 'Yellow', class: 'bg-macaron-yellow' },
  { value: 'blue', label: 'Blue', class: 'bg-macaron-blue' },
];

export function ColorThemePicker() {
  const { settings, updateSettings } = useSettingsStore();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold">Color Theme</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {colorThemes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => updateSettings({ colorTheme: theme.value })}
            className={`w-12 h-12 rounded-full transition-all ${theme.class} ${
              settings.colorTheme === theme.value
                ? 'ring-4 ring-offset-2 ring-gray-400'
                : 'hover:scale-110'
            }`}
            title={theme.label}
          />
        ))}
      </div>
    </div>
  );
}