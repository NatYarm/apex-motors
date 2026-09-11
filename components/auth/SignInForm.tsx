'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { routes } from '@/config/routes';
import { authClient } from '@/lib/auth-client';
import { SignInSchema } from '@/schemas/auth.schema';

type SignInForm = z.infer<typeof SignInSchema>;

export const SignInForm = ({
  openForgotPassword,
}: {
  openForgotPassword: () => void;
}) => {
  const router = useRouter();
  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function handleSignIn(data: SignInForm) {
    await authClient.signIn.email(
      { email: data.email, password: data.password },
      {
        onError: (error) => {
          toast.error(error.error.message || 'Failed to sign in');
        },
        onSuccess: () => router.push(routes.admin.dashboard),
      },
    );
  }

  return (
    <div className="pb-10">
      <Form {...form}>
        <form
          className="border shadow-lg p-10 rounded-md bg-card"
          onSubmit={form.handleSubmit(handleSignIn)}
        >
          <div className="flex items-center mb-6 justify-center">
            <h2 className="uppercase text-2xl font-bold">Admin Sign In</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your administrator email address"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex-between">
                      <FormLabel>Password</FormLabel>
                      <Button
                        onClick={openForgotPassword}
                        type="button"
                        variant="link"
                        size="sm"
                        className="text-sm underline px-0"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="password"
                        placeholder="Enter your password"
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="my-6">
              <p className="text-sm text-text-muted-foreground mb-2 text-center">
                <b>This is for admin only.</b>
              </p>
            </div>
            <div className="space-y-4">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full uppercase font-bold"
              >
                {isSubmitting && (
                  <Loader2
                    className="h-4 w-4 shrink-0 animate-spin"
                    aria-hidden="true"
                  />
                )}{' '}
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
};
