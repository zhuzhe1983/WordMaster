import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { useTheme } from '../ui/theme';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isDark, colorTheme } = useTheme();

  return (
    <div className={`flex min-h-screen theme-transition ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'
    }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <MobileNav />
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}