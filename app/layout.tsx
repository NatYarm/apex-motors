import type { Metadata } from 'next';
import './globals.css';
import { Mulish, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const mulish = Mulish({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
});
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Car Dealer Website',
  description: 'A car dealer website with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'antialiased',
          'overscroll-none',
          'bg-background',
          mulish.variable,
          roboto.variable,
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
