'use client';

import { useState } from 'react';

import Image, { ImageProps } from 'next/image';

import { imgixLoader } from '@/lib/imgix-loader';

type ImgixImageProps = Omit<ImageProps, 'priority' | 'loading'>;

export const ImgixImage = (props: ImgixImageProps) => {
  const [error, setError] = useState(false);
  const { alt, ...rest } = props;

  if (error) return <Image fetchPriority="high" {...rest} alt={alt} />;

  return (
    <Image
      fetchPriority="high"
      loader={(imgProps) => imgixLoader(imgProps)}
      onError={() => setError(true)}
      {...rest}
      alt={alt}
    />
  );
};
