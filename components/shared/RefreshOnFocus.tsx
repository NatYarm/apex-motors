'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

// Re-validates the session on tab refocus, so account changes made in another tab (e.g. sign-out, deletion) take effect here too.
export function RefreshOnFocus() {
  const router = useRouter();

  useEffect(() => {
    function handleFocus() {
      router.refresh();
    }

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [router]);

  return null;
}
