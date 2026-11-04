import { z } from 'zod';

import {
  BodyType,
  Color,
  FuelType,
  OdoUnit,
  Transmission,
} from '@/generated/prisma/enums';

export const ClassifiedTaxonomyAISchema = z.object({
  year: z.number().describe('The year of the vehicle'),
  makeId: z.number().nullable().describe('The make ID of the vehicle'),
  make: z.string().describe('The make of the vehicle'),
  modelId: z.number().nullable().describe('The model ID of the vehicle'),
  model: z.string().describe('The model of the vehicle'),
  modelVariantId: z
    .number()
    .nullable()
    .describe('The model variant ID of the vehicle'),
  modelVariant: z
    .string()
    .nullable()
    .describe('The model variant of the vehicle'),
});

export const ClassifiedDetailsAISchema = z.object({
  description: z
    .string()
    .describe(
      'The description of the vehicle. Ensure it is 50 words or less and does not contain any HTML tags.',
    ),
  vrm: z
    .string()
    .describe(
      "The vehicle registration mark. If unable to detect use 'UNKNOWN'",
    ),
  odoReading: z.number().describe('The odometer reading of the vehicle'),
  doors: z.number().describe('The number of doors on the vehicle'),
  seats: z.number().describe('The number of seats in the vehicle'),
  transmission: z
    .enum(Transmission)
    .describe('THe transmission of the vehicle'),
  color: z.enum(Color).describe('THe colour of the vehicle'),
  fuelType: z.enum(FuelType).describe('THe fuel type of the vehicle'),
  bodyType: z.enum(BodyType).describe('THe body type of the vehicle'),
  odoUnit: z.enum(OdoUnit).describe('THe odometer unit of the vehicle'),
});

export const ClassifiedAISchema = ClassifiedDetailsAISchema.extend(
  ClassifiedTaxonomyAISchema.shape,
).extend({
  title: z.string().describe('The title of the vehicle'),
  image: z.url().describe('The image of the vehicle'),
});

export type ClassifiedAI = z.infer<typeof ClassifiedAISchema>;

export const CreateClassifiedSchema = ClassifiedAISchema.extend({
  make: z.object({
    id: z.number().int(),
    name: z.string(),
    image: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type CreateClassifiedInput = z.infer<typeof CreateClassifiedSchema>;
