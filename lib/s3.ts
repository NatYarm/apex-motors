import {
  type PutObjectCommandInput,
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

import { env } from '@/env.mjs';

export const s3 = new S3Client({
  region: env.NEXT_PUBLIC_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: env.S3_BUCKET_SECRET_KEY,
  },
});

interface UploadToS3Args {
  bucketName: string;
  path: string;
  file: Buffer;
  mimetype: string;
}

export async function uploadToS3({
  bucketName,
  path,
  file,
  mimetype,
}: UploadToS3Args) {
  const params = {
    Bucket: bucketName,
    Key: path,
    Body: file,
    ContentType: mimetype,
    CacheControl: 'no-store',
  } satisfies PutObjectCommandInput;

  try {
    const command = new PutObjectCommand(params);

    return await s3.send(command);
  } catch (error: unknown) {
    throw new Error(`Failed to upload file: ${path}. Error: ${error}`);
  }
}
