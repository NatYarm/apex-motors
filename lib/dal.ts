import 'server-only';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export const getSession = async (requestHeaders?: Headers) => {
  return auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });
};
