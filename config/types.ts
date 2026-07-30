import { Prisma } from '@/generated/prisma/client';

type Params = {
  [x: string]: string | string[];
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps['params']>;
  searchParams?: Awaited<PageProps['searchParams']>;
};

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: { images: true };
}>;

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export interface Favorites {
  ids: number[];
}

export interface FilterProps extends AwaitedPageProps {
  handleChange: (name: string, value: string) => void;
}

export type TaxonomyResponse = {
  makes: FilterOptions<string, string>;
  models: FilterOptions<string, string>;
  modelVariants: FilterOptions<string, string>;
};

export type FilterOptions<LType, VType> = Array<{ label: LType; value: VType }>;

type SidebarMinMaxValues = {
  _min: {
    year: number | null;
    price: number | null;
    odoReading: number | null;
  };
  _max: {
    year: number | null;
    price: number | null;
    odoReading: number | null;
  };
};

export interface SidebarProps extends AwaitedPageProps {
  minMaxValues: SidebarMinMaxValues;
}
