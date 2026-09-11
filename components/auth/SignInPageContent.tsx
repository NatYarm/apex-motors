'use client';

import { useState } from 'react';

import { ForgotPassword } from './ForgotPassword';
import { SignInForm } from './SignInForm';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type View = 'signin' | 'forgot-password';

export const SignInPageContent = () => {
  const [view, setView] = useState<View>('signin');

  return (
    <div className="flex-center flex-col min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        {view === 'signin' && (
          <SignInForm openForgotPassword={() => setView('forgot-password')} />
        )}

        {view === 'forgot-password' && (
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <ForgotPassword openSignInTab={() => setView('signin')} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
