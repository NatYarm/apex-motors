'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { routes } from '@/config/routes';
import { authClient } from '@/lib/auth-client';

const profileUpdateSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
});

type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;
type ProfileUpdateFormProps = {
  user: {
    email: string;
    name: string;
  };
};

export function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
  const router = useRouter();
  const form = useForm<ProfileUpdateForm>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: user,
  });

  const { isSubmitting } = form.formState;

  async function handleProfileUpdate(data: ProfileUpdateForm) {
    const promises = [
      authClient.updateUser({
        name: data.name,
      }),
    ];

    if (data.email !== user.email) {
      promises.push(
        authClient.changeEmail({
          newEmail: data.email,
          callbackURL: routes.admin.dashboard,
        }),
      );
    }

    const res = await Promise.all(promises);

    const updateUserResult = res[0];
    const emailResult = res[1] ?? { error: false };

    if (updateUserResult.error) {
      toast.error(updateUserResult.error.message || 'Failed to update profile');
    } else if (emailResult.error) {
      toast.error(emailResult.error.message || 'Failed to change email');
    } else {
      if (data.email !== user.email) {
        toast.success('Verify your new email address to complete the change.');
      } else {
        toast.success('Profile updated successfully');
      }
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && (
            <Loader2
              className="h-4 w-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
          )}{' '}
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
