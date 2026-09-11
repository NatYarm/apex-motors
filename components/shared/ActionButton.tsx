'use client';

import {
  type ComponentProps,
  type ReactNode,
  useState,
  useTransition,
} from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function ActionButton({
  action,
  requireAreYouSure = false,
  areYouSureDescription = 'This action cannot be undone.',
  ...props
}: ComponentProps<typeof Button> & {
  action: () => Promise<{ error: boolean; message?: string | undefined }>;
  requireAreYouSure?: boolean;
  areYouSureDescription?: ReactNode;
}) {
  const [isLoading, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function performAction() {
    startTransition(async () => {
      const data = await action();

      if (data.error) {
        toast.error(data.message ?? 'Error');
      } else if (data.message) {
        toast.success(data.message);
      }

      setIsDialogOpen(false);
    });
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog
        open={isDialogOpen || isLoading}
        onOpenChange={setIsDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {areYouSureDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              {isLoading && (
                <Loader2
                  className="h-4 w-4 shrink-0 animate-spin"
                  aria-hidden="true"
                />
              )}{' '}
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      {...props}
      disabled={props.disabled ?? isLoading}
      onClick={(e) => {
        performAction();
        props.onClick?.(e);
      }}
    >
      {isLoading && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}
      {props.children}
    </Button>
  );
}
