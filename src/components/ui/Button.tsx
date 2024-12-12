import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useSettingsStore } from '@/store/settings';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const { settings } = useSettingsStore();
    const colorTheme = `macaron-${settings.colorTheme}`;

    const baseStyles = {
      primary: `bg-${colorTheme} hover:bg-opacity-90 text-white dark:text-gray-900`,
      secondary: `bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600`,
      outline: `border-2 border-${colorTheme} text-${colorTheme} hover:bg-${colorTheme}/10`,
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'btn theme-transition',
          baseStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);