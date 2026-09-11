import { ReactNode, Suspense } from 'react';

import { Loader2Icon, Shield, Trash2, User } from 'lucide-react';

import { ChangePasswordForm } from '../admin/profile/ChangePasswordForm';
import { DeleteAccount } from '../admin/profile/DeleteAccount';
import { ProfileUpdateForm } from '../admin/profile/ProfileUpdateForm';
import { TwoFactorAuth } from '../auth/TwoFactorAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';

export const SettingsPageContent = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const isTwoFactorEnabled = session.user.twoFactorEnabled ?? false;

  return (
    <Tabs className="space-y-2 px-6" defaultValue="profile">
      <TabsList className="w-full max-w-2xl">
        <TabsTrigger value="profile">
          <User />
          <span className="max-sm:hidden">Profile</span>
        </TabsTrigger>

        <TabsTrigger value="security">
          <Shield />
          <span className="max-sm:hidden">Security</span>
        </TabsTrigger>

        <TabsTrigger value="danger">
          <Trash2 />
          <span className="max-sm:hidden">Danger</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="w-full max-w-2xl">
          <CardContent>
            <ProfileUpdateForm user={session.user} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <LoadingSuspense>
          <div className="flex-col max-w-2xl space-y-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password for improved security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm />
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="flex items-center justify-between gap-2">
                <CardTitle>Two-Factor Authentication</CardTitle>
                <Badge variant={isTwoFactorEnabled ? 'default' : 'secondary'}>
                  {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </CardHeader>
              <CardContent>
                <TwoFactorAuth isEnabled={isTwoFactorEnabled} />
              </CardContent>
            </Card>
          </div>
        </LoadingSuspense>
      </TabsContent>

      <TabsContent value="danger">
        <Card className="border border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <DeleteAccount />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

function LoadingSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader2Icon className="size-20 animate-spin" />}>
      {children}
    </Suspense>
  );
}
