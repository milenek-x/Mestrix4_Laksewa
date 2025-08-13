// DataTablePagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'; // Adjust path as per your project structure

interface DataTablePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  // Optional: for displaying a range, e.g., "1-10 of 100 items"
  startItem?: number;
  endItem?: number;
  label?: string; // Custom label, defaults to "Items"
}

export function DataTablePagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  startItem,
  endItem,
  label = 'Items',
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Determine start and end item for display if not explicitly provided
  const displayStartItem = startItem !== undefined ? startItem : (currentPage - 1) * itemsPerPage + 1;
  const displayEndItem = endItem !== undefined ? endItem : Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex w-full items-center justify-between p-4">
      {/* Left side: Label */}
      <div className="flex-shrink-0 text-sm text-muted-foreground">
        {displayStartItem}-{displayEndItem} of {totalItems} {label}
      </div>

      {/* Right side: Pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {/* Render page numbers (simplified for common cases, extend as needed for more complex pagination) */}
          {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
