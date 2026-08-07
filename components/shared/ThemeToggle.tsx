'use client';

import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      className="group h-10 w-10 rounded-full bg-muted hover:bg-primary/80 dark:hover:bg-primary/80"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      <SunMoon className="h-5 w-5 transition-all group-hover:text-foreground group-hover:fill-foreground" />
    </Button>
  );
}
