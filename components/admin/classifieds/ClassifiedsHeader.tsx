import { CreateClassifiedDialog } from './CreateClassifiedDialog';

import { RadioFilter } from '@/components/shared/RadioFilter';
import type { AwaitedPageProps } from '@/config/types';
import { ClassifiedStatus } from '@/generated/prisma/enums';

export const AdminClassifiedsHeader = ({ searchParams }: AwaitedPageProps) => {
  return (
    <div className="flex flex-col p-6 space-y-4">
      <div className="flex-between">
        <h1 className="font-semibold text-lg md:text-2xl">All Classifieds</h1>
        <div className="flex-between">
          <RadioFilter
            items={['ALL', ...Object.values(ClassifiedStatus)]}
            searchParams={searchParams}
          />
          <CreateClassifiedDialog />
        </div>
      </div>
    </div>
  );
};
