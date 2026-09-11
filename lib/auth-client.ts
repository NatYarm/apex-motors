import { twoFactorClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { routes } from '@/config/routes';

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect: () => {
        window.location.href = routes.twoFactor;
      },
    }),
  ],
});
