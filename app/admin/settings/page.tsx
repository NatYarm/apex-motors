import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignOut } from '@/components/auth/SignOut';
import { SettingsPageContent } from '@/components/settings/SettingsPageContent';
import { routes } from '@/config/routes';
import { auth } from '@/lib/auth';

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session == null) return redirect(routes.signIn);

  return (
    <div className="flex flex-col max-w-2xl w-full">
      <div className="p-6">
        <h1 className="font-semibold text-lg md:text-2xl">Account Settings</h1>
      </div>
      <div className="mb-6 px-6">
        <div>
          <h2 className="text-base font-semibold leading-7 text-muted-foreground mb-1">
            Log out of all sessions
          </h2>
          <p className="mb-2 text-sm leading-6 text-muted-foreground">
            This will log out of all of your sessions across all of your devices
            of which you are currently logged into.
          </p>
        </div>
        <SignOut />
      </div>
      <SettingsPageContent session={session} />
    </div>
  );
}
