'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ClassifiedCard } from '../inventory/ClassifiedCard';
import { SwiperButtons } from '../shared/SwiperButtons';

import { Prisma } from '@/generated/prisma/client';
import 'swiper/css';

interface CarouselProps {
  classifieds: Prisma.ClassifiedGetPayload<{ include: { images: true } }>[];
  favorites: number[];
}

export const LatestArrivalsCarousel = ({
  classifieds,
  favorites,
}: CarouselProps) => {
  return (
    <div className="mt-8 relative">
      <Swiper
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        modules={[Navigation]}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
      >
        {classifieds.map((classified) => (
          <SwiperSlide key={classified.id}>
            <ClassifiedCard classified={classified} favorites={favorites} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperButtons
        prevClassName="-left-12 border border-2 border-border color-white hidden lg:flex"
        nextClassName="-right-12 border border-2 border-border text-border hidden lg:flex"
      />
    </div>
  );
};
