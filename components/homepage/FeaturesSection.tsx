import { imageSources } from '@/config/constants';
import { imgixLoader } from '@/lib/imgix-loader';

export const FeaturesSection = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <h2 className="text-base md:text-2xl font-semibold leading-7">
            Find your perfect drive
          </h2>
          <h2 className="mt-2 uppercase text-4xl font-bold tracking-tight sm:text-8xl">
            No car yet? We&apos;ve got you covered.
          </h2>
          <p className="mt-6 text-lg leading-8">
            Explore our exclusive collection of premium vehicles, combining
            performance, style and an exceptional driving experience.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 -mb-16 sm:-mb-24 xl:mb-0">
        <div
          className="mx-auto max-w-7xl h-80 bg-cover bg-no-repeat bg-center xl:rouned-t-xl shadow-2xl"
          style={{
            backgroundImage: `url(${imgixLoader({ src: imageSources.featuresSection, width: 1280, quality: 100 })})`,
          }}
        />
        <div aria-hidden="true" className="relative hidden xl:block">
          <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-background  to-transparent pt-[3%] " />
        </div>
      </div>
    </div>
  );
};
