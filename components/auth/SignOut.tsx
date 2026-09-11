'use client';

import { useTransition } from 'react';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

import { routes } from '@/config/routes';
import { authClient } from '@/lib/auth-client';

export const SignOut = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.replace(routes.home);
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="flex items-center gap-2 max-w-2xs w-full"
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign out
    </Button>
  );
};
