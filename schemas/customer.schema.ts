import { z } from 'zod';

import { CustomerStatus } from '@/generated/prisma/enums';

export const SubmitDetailsSchema = z.object({
  firstName: z.string({ message: 'firstName is required' }),
  lastName: z.string({ message: 'lastName is required' }),
  email: z.string({ message: 'email is required' }),
  mobile: z.string({ message: 'mobile is required' }),
  terms: z.enum(['true', 'false'], {
    message: 'You must agree to the terms and conditions',
  }),
});

export type SubmitDetailsSchemaType = z.infer<typeof SubmitDetailsSchema>;

export const CreateCustomerSchema = SubmitDetailsSchema.extend({
  date: z.date(),
  slug: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;

export const EditCustomerSchema = z.object({
  status: z.enum(CustomerStatus),
});

export type EditCustomerType = z.infer<typeof EditCustomerSchema>;

export const UpdateCustomerSchema = EditCustomerSchema.extend({
  id: z.number(),
});
