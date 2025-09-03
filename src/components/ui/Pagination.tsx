import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"; // or radix icons
import { Button } from "./button";

interface PaginationControlsProps<T> {
  table: Table<T>;
}

const PaginationControls = <T,>({ table }: PaginationControlsProps<T>) => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center flex-wrap gap-2">
        {/* First Page */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>

        {/* Page Indicator */}
        <span className="ml-2 md:text-sm text-gray-700 text-xs">
          Page{" "}
          <strong className="text-gray-900">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default PaginationControls;
