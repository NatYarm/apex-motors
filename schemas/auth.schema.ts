import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string(),
  // .min(6, 'Password must be more than 6 characters')
  // .max(30, 'Password must be less than 30 characters'),
});
