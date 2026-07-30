'use client';

import { useQueryState } from 'nuqs';

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from '@/components/ui/pagination';
import { env } from '@/env.mjs';
import { cn } from '@/lib/utils';

interface PaginationProps {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number;
  styles: {
    paginationRoot: string;
    paginationPrev: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}
export const CustomPagination = ({
  baseURL,
  totalPages,
  maxVisiblePages = 5,
  styles,
}: PaginationProps) => {
  const [currentPage, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);

      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
    shallow: false,
  });

  const visibleRange = (() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);

    const start = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1),
    );

    return {
      start,
      end: Math.min(start + maxVisiblePages - 1, totalPages),
    };
  })();

  const createPageUrl = (pageNum: number) => {
    const url = new URL(baseURL, env.NEXT_PUBLIC_APP_URL);

    url.searchParams.set('page', pageNum.toString());

    return url.toString();
  };

  const handleEllipsisClick = (direction: 'left' | 'right') => {
    const newPage =
      direction === 'left'
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);

    setPage(newPage);
  };

  const onPrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const onNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <PaginationRoot className={styles.paginationRoot}>
      <PaginationContent className="lg:gap-4">
        <PaginationItem>
          <PaginationPrevious
            className={cn(currentPage <= 1 && 'hidden', styles.paginationPrev)}
            href={createPageUrl(currentPage - 1)}
            onClick={onPrevClick}
          />
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem>
            <PaginationLink
              className={styles.paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('left');
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, idx) => visibleRange.start + idx,
        ).map((pageNum) => {
          const isActive = pageNum === currentPage;
          let rel = '';

          if (pageNum === currentPage - 1) rel = 'prev';

          if (pageNum === currentPage + 1) rel = 'next';

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={isActive}
                href={createPageUrl(pageNum)}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNum);
                }}
                className={cn(
                  styles.paginationLink,
                  isActive && styles.paginationLinkActive,
                )}
                {...(rel ? { rel } : {})}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {visibleRange.end < totalPages && (
          <PaginationItem>
            <PaginationLink
              className={styles.paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEllipsisClick('right');
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage >= totalPages && 'hidden',
              styles.paginationNext,
            )}
            href={createPageUrl(currentPage + 1)}
            onClick={onNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};
