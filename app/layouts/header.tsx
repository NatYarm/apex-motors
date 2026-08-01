import { HeartIcon, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navLinks } from '@/config/constants';
import { routes } from '@/config/routes';
import { Favorites } from '@/config/types';
import { redis } from '@/lib/redis-store';
import { getSourceId } from '@/lib/source-id';
import logoLight from '@/public/logo-light.png';
import logoDark from '@/public/logo.png';

export async function PublicHeader() {
  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? '');

  return (
    <header className="flex-between h-16 px-4 bg-transparent gap-x-6">
      <div className="flex items-center flex-1 ">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image
            width={80}
            height={80}
            alt="Apex Motors logo light theme"
            src={logoLight}
            className="relative dark:hidden"
            priority
          />
          <Image
            width={80}
            height={80}
            alt="Apex Motors logo dark theme"
            src={logoDark}
            className="relative hidden dark:block"
            priority
          />
        </Link>
      </div>
      <nav className="hidden md:flex">
        {navLinks.map((link) => (
          <Link key={link.id} className="navLink" href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex-center gap-2">
        <ThemeToggle />

        <Link href={routes.favorites} className="relative inline-block group">
          <div className="flex-center group-hover:bg-pink-500/80 duration-200 transition-colors ease-in-out w-10 h-10 rounded-full bg-muted">
            <HeartIcon className="w-4.5 h-4.5 group-hover:text-foreground group-hover:fill-foreground" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 flex-center w-4.5 h-4.5 text-foreground text-xs bg-pink-500 rounded-full group-hover:bg-primary">
            {favorites ? favorites.ids.length : 0}
          </div>
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="icon" className="md:hidden border-none">
            <MenuIcon className="w-6 h-6 text-foreground" />
            <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full max-w-xs p-4">
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
