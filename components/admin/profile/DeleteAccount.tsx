'use client';

import { BetterAuthActionButton } from '@/components/auth/BetterAuthActionButton';
import { authClient } from '@/lib/auth-client';

export function DeleteAccount() {
  return (
    <BetterAuthActionButton
      requireAreYouSure
      variant="destructive"
      className="w-full border-destructive"
      successMessage="Account deletion initiated. Please check your email to confirm."
      action={() => authClient.deleteUser({ callbackURL: '/' })}
    >
      Delete Account Permanently
    </BetterAuthActionButton>
  );
}
