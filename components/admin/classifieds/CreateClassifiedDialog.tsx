'use client';

import { useState, useTransition } from 'react';

import { readStreamableValue, useActions, useUIState } from '@ai-sdk/rsc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ImageUploader } from './SingleImageUploader';
import type { StreamableSkeletonProps } from './StreamableSkeleton';

import type { AI } from '@/app/_actions/ai';
import { createClassifiedAction } from '@/app/_actions/classified';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import {
  CreateClassifiedInput,
  CreateClassifiedSchema,
} from '@/schemas/classified-ai.schema';
import { SingleImageSchema, SingleImageType } from '@/schemas/images.schema';

export const CreateClassifiedDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();
  const { generateClassified } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const createForm = useForm<CreateClassifiedInput>({
    resolver: zodResolver(CreateClassifiedSchema),
  });

  const handleImageUpload = (url: string) => {
    imageForm.setValue('image', url);
  };

  const onImageSubmit: SubmitHandler<SingleImageType> = (data) => {
    startUploadTransition(async () => {
      const responseMessage = await generateClassified(data.image);

      if (!responseMessage) return;
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
      try {
        for await (const value of readStreamableValue(
          responseMessage.classified,
        )) {
          if (value) createForm.reset(value);
        }
      } catch {
        setMessages([]);
        toast.error('AI generation failed. Please try again later.');
      }
    });
  };

  const onCreateSubmit: SubmitHandler<StreamableSkeletonProps> = (data) => {
    startCreateTransition(async () => {
      setMessages([]);
      const { success, message } = await createClassifiedAction(data);

      if (!success) {
        toast.error(message, { duration: 2500 });

        return;
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">Create New</Button>
      </DialogTrigger>
      <DialogContent className={cn('max-w-4xl! bg-white')}>
        <DialogHeader>
          <DialogTitle className="text-gray-600">
            Create New Classified
          </DialogTitle>
        </DialogHeader>

        {messages.length ? (
          <Form {...createForm}>
            <form
              className="space-y-4"
              onSubmit={createForm.handleSubmit(onCreateSubmit)}
            >
              {messages.map((message) => (
                <div className="w-full" key={message.id}>
                  {message.display}
                </div>
              ))}
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isCreating || isUploading}
                  type="submit"
                  className="flex items-center gap-x-2"
                >
                  {isCreating || isUploading ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : null}
                  {isUploading ? 'Uploading...' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...imageForm}>
            <form
              className="space-y-4"
              onSubmit={imageForm.handleSubmit(onImageSubmit)}
            >
              <ImageUploader onUploadComplete={handleImageUpload} />
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent! hover:bg-input/30!"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isUploading}
                  type="submit"
                  className="flex items-center gap-x-2"
                >
                  {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
                  Upload
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
