'use server';

import { revalidatePath } from 'next/cache';

import { routes } from '@/config/routes';
import { CustomerStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  CreateCustomerSchema,
  type CreateCustomerType,
  UpdateCustomerSchema,
} from '@/schemas/customer.schema';

export const createCustomerAction = async (props: CreateCustomerType) => {
  try {
    const { data, success } = CreateCustomerSchema.safeParse(props);

    if (!success) {
      return { success: false, message: 'Invalid data' };
    }

    if (data.terms !== 'true') {
      return { success: false, message: 'You must accept the terms' };
    }

    const { date, terms, slug, ...rest } = data;

    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: date,
        termsAccepted: terms === 'true',
        classified: { connect: { slug } },
      },
    });

    return { success: true, message: 'Reservation Successful!' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
};

export const deleteCustomerAction = async (id: number) => {
  try {
    await prisma.customer.delete({ where: { id } });
    revalidatePath(routes.admin.customers);

    return { success: true, message: 'Customer deleted' };
  } catch {
    return {
      success: false,
      message: 'Something went wrong deleting customer',
    };
  }
};

export const updateCustomerAction = async (props: {
  id: number;
  status: CustomerStatus;
}) => {
  try {
    const validProps = UpdateCustomerSchema.safeParse(props);

    if (!validProps.success) return { success: false, message: 'Invalid data' };

    const customer = await prisma.customer.findUnique({
      where: { id: validProps.data?.id },
    });

    if (!customer) return { success: false, message: 'Customer not found' };

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        status: validProps.data.status,
        lifecycle: {
          create: {
            oldStatus: customer.status,
            newStatus: validProps.data.status,
          },
        },
      },
    });

    revalidatePath(routes.admin.editCustomer(customer.id));
    revalidatePath(routes.admin.customers);

    return { success: true, message: 'Customer updated' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Something went wrong' };
  }
};
