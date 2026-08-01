'use client';

import { startTransition, useActionState, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { AutoDismissMessage } from './AutoDismissMessage';

import { subscribeAction } from '@/app/_actions/subscribe';
import { SubscribeSchema } from '@/schemas/subscribe-schema';

type SubscribeFormValues = z.infer<typeof SubscribeSchema>;

export const NewsletterForm = () => {
  const [state, formAction, pending] = useActionState(subscribeAction, {
    success: false,
    message: '',
  });
  const [submitTick, setSubmitTick] = useState(0);

  const form = useForm<SubscribeFormValues>({
    resolver: zodResolver(SubscribeSchema),
    mode: 'onChange',
  });

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger();

    if (!valid) return;

    setSubmitTick((current) => current + 1);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="space-y-1">
      <h3 className="text-xl font-bold text-primary">
        Subscribe to our inventory updates
      </h3>
      <p className="text-muted-foreground text-sm mb-2">
        Enter your details to receive new stock updates
      </p>
      <form className="space-y-4" action={handleFormAction}>
        <div className="grid grid-cols-1 gap-3 ">
          <div className="w-full">
            <FieldLabel
              htmlFor="firstName"
              className="text-xs text-muted-foreground mb-1"
            >
              First name
            </FieldLabel>

            <Input
              id="firstName"
              {...form.register('firstName')}
              className="dark:bg-muted/70"
            />
            <FieldError
              errors={[form.formState.errors.firstName]}
              className="text-xs"
            />
          </div>

          <div>
            <FieldLabel
              htmlFor="lastName"
              className="text-xs text-muted-foreground mb-1"
            >
              Last name
            </FieldLabel>
            <Input
              id="lastName"
              {...form.register('lastName')}
              className="dark:bg-muted/70"
            />
            <FieldError
              errors={[form.formState.errors.lastName]}
              className="text-xs"
            />
          </div>

          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-xs text-muted-foreground -mb-1"
            >
              Email
            </FieldLabel>

            <Input
              id="email"
              type="email"
              {...form.register('email')}
              className="dark:bg-muted/70"
            />
            <FieldError
              errors={[form.formState.errors.email]}
              className="text-xs"
            />
          </Field>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending && (
            <Loader2
              className="h-4 w-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
          )}
          Subscribe Now
        </Button>

        <AutoDismissMessage
          key={`${submitTick}-${state.success}-${state.message}`}
          success={state.success}
          message={state.message}
        />
      </form>
    </div>
  );
};
