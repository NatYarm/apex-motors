import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { HeroSection } from '@/components/homepage/HeroSection';
import { LatestArrivals } from '@/components/homepage/LatestArrivals';
import { OurBrandsSection } from '@/components/homepage/OurBrandsSection';
import { PageProps } from '@/config/types';

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-full min-h-screen">
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LatestArrivals />
      <OurBrandsSection />
    </div>
  );
}
