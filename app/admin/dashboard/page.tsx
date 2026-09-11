import { headers } from 'next/headers';

import { SignOut } from '@/components/auth/SignOut';
import { auth } from '@/lib/auth';

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <div className="flex-between">Dashboard {session && <SignOut />}</div>;
}
