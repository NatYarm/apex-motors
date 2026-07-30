import z from 'zod';

export const PageSchema = z
  .string()
  .transform((val) => Math.max(Number(val)))
  .optional();
