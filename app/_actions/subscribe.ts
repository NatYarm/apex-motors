'use server';

import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';

import { CustomerStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { SubscribeSchema } from '@/schemas/subscribe-schema';

type SubscribeActionState = {
  success: boolean;
  message: string;
};

export const subscribeAction = async (
  _: SubscribeActionState,
  formData: FormData,
) => {
  try {
    const { data, success, error } = SubscribeSchema.safeParse({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    });

    if (!success) {
      return { success: false, message: error.message };
    }

    const subscriber = await prisma.customer.findFirst({
      where: { email: data.email },
    });

    if (subscriber) {
      return { success: false, message: 'You are already subscirbed!' };
    }

    await prisma.customer.create({
      data: {
        ...data,
        status: CustomerStatus.SUBSCRIBED,
      },
    });

    return { success: true, message: 'Subscribed successfully' };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: false, message: error.message };
    }
    if (error instanceof PrismaClientValidationError) {
      return { success: false, message: error.message };
    }
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong!' };
  }
};
