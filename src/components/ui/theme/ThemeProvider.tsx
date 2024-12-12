import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSettingsStore } from '@/store/settings';

interface ThemeContextType {
  colorTheme: string;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  colorTheme: 'pink',
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettingsStore();
  const colorTheme = `macaron-${settings.colorTheme}`;
  const isDark = settings.theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ colorTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);