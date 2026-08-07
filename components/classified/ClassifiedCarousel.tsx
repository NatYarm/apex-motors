'use client';

import { useCallback, useState } from 'react';

import FsLightbox from 'fslightbox-react';
import { type Swiper as SwiperType } from 'swiper';
import { EffectFade, Navigation, Thumbs, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperButtons } from '../shared/SwiperButtons';
import { ImgixImage } from '../ui/imgix-image';

import { Image as PrismaImage } from '@/generated/prisma/client';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/virtual';
import { imgixLoader } from '@/lib/imgix-loader';

interface ClassifiedCarouselProps {
  images: PrismaImage[];
}

export const ClassifiedCarousel = ({ images }: ClassifiedCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleImageClick = useCallback(() => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: activeIndex,
    });
  }, [activeIndex, lightboxController.toggler]);

  const sources = images.map((image) =>
    imgixLoader({ src: image.src, width: 1200, quality: 100 }),
  );

  return (
    <>
      <FsLightbox
        toggler={lightboxController.toggler}
        sourceIndex={lightboxController.sourceIndex}
        sources={sources}
        type="image"
      />

      <div className="relative">
        <Swiper
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          effect="fade"
          spaceBetween={10}
          fadeEffect={{ crossFade: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[EffectFade, Navigation, Thumbs, Virtual]}
          virtual={{
            addSlidesAfter: 8,
            enabled: true,
          }}
          onSlideChange={handleSlideChange}
          className="aspect-3/2"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={image.id} virtualIndex={idx}>
              <ImgixImage
                blurDataURL={image.blurhash}
                placeholder="blur"
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="aspect-3/2 object-cover rounded-md cursor-pointer"
                onClick={handleImageClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperButtons
          prevClassName="left-4 bg-white/80"
          nextClassName="right-4 bg-white/80"
        />
      </div>

      <Swiper
        modules={[Thumbs, Navigation, EffectFade]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.id}
            className="relative mt-2 h-fit w-full cursor-grab"
          >
            <ImgixImage
              placeholder="blur"
              src={image.src}
              alt={image.alt}
              width={150}
              height={100}
              quality={25}
              blurDataURL={image.blurhash}
              className="aspect-3/2 object-cover rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
