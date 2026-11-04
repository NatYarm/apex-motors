import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { MAX_IMAGE_SIZE } from '@/config/constants';
import { env } from '@/env.mjs';
import { getSession } from '@/lib/dal';
import { uploadToS3 } from '@/lib/s3';
import { SingleImageUploadSchema } from '@/schemas/images.schema';

export const POST = async (req: NextRequest) => {
  const session = await getSession(req.headers);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();

  const validated = SingleImageUploadSchema.safeParse(formData);

  if (!validated.success) {
    return NextResponse.json({ message: 'Invalid file' }, { status: 400 });
  }

  const { file } = validated.data;
  const uuid = uuidv4();

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ message: 'Invalid file size' }, { status: 400 });
  }

  const { default: mimetype } = await import('mime-types');

  const mime = mimetype.lookup(file.name).toString();

  if (mime.match(/image\/(jpeg|jpg|png|webp)/) === null) {
    return NextResponse.json(
      { message: `Invalid file type ${mime}` },
      { status: 400 },
    );
  }

  const decodedFileName = decodeURIComponent(decodeURIComponent(file.name));
  const key = `uploads/${uuid}/${decodedFileName}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    await uploadToS3({
      bucketName: env.NEXT_PUBLIC_S3_BUCKET_NAME,
      file: buffer,
      path: key,
      mimetype: mime,
    });

    const url = `${env.NEXT_PUBLIC_S3_URL}/${key}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error uploading file ${error.message}` },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: `Something went wrong` },
      { status: 400 },
    );
  }
};
