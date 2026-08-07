import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    DATABASE_URL: z.url(),
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    S3_BUCKET_ACCESS_KEY: z.string(),
    S3_BUCKET_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGIX_URL: z.url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    S3_BUCKET_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
    S3_BUCKET_SECRET_KEY: process.env.S3_BUCKET_SECRET_KEY,
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
  },
});
