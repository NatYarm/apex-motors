'use client';

import { useTransition } from 'react';

import {
  ArrowRightIcon,
  CircleCheckIcon,
  CreditCardIcon,
  Loader2,
  LockIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { HTMLParser } from '../shared/HTMLParser';
import { Button } from '../ui/button';

import { MultiStepFormComponentProps, MultiStepFormEnum } from '@/config/types';

export const Welcome = ({ classified }: MultiStepFormComponentProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextStep = () => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 500));
      const url = new URL(window.location.href);

      url.searchParams.set('step', MultiStepFormEnum.SELECT_DATE.toString());
      router.push(url.toString());
    });
  };

  return (
    <div className="mx-auto bg-card rounded-b-lg shadow-lg">
      <div className="p-6">
        <div className="flex gap-x-12 justify-between">
          <div className="flex-1">
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-success w-6 h-6 mr-2" />
              <p className="">Reserve in minutes with 2 simple steps</p>
            </div>
            <div className="flex items-start mb-4">
              <CircleCheckIcon className="text-success w-6 h-6 mr-2" />
              <p className="">Arrange a handover date for your new vehicle</p>
            </div>
          </div>
          <div className="flex flex-1 space-x-2">
            <div className="relative w-16 h-16">
              <Image
                src={classified.make.image}
                alt={classified.make.name}
                className="aspect-square object-contain"
                height={100}
                width={100}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold line-clamp-1">
                {classified.title}
              </h2>
              <div className="text-xs line-clamp-2">
                <HTMLParser html={classified.description ?? ''} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-accent p-4 rounded-md mb-4">
          <div className="text-center">
            <p className="font-bold">Select Handover Date & Time</p>
            <p className="text-muted-foreground">approx. 1 minute</p>
          </div>
          <ArrowRightIcon className="w-6 h-6" />
          <div className="text-center">
            <p className="font-bold">Submit Your Details</p>
            <p className="text-muted-foreground">approx. 1 minute</p>
          </div>
        </div>
        <p className="font-bold mb-4">Ready to begin?</p>
        <div className="flex justify-around items-center">
          <div className="flex items-center flex-col justify-center space-y-2">
            <LockIcon className="w-6 h-6" />
            <p className="text-muted-foreground">SSL Secure</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <StarIcon className="w-6 h-6" />
            <p className="text-muted-foreground">Trustpilot</p>
          </div>
          <div className="flex items-center flex-col justify-center space-y-2">
            <CreditCardIcon className="w-6 h-6" />
            <p className="text-muted-foreground">Stripe</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Button
          type="button"
          onClick={nextStep}
          disabled={isPending}
          className="uppercase font-bold flex gap-x-3 w-full"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
          ) : null}
          I&apos;m Ready
        </Button>
      </div>
    </div>
  );
};
