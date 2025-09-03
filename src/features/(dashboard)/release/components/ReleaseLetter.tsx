import CustomTable from "@/components/ui/CustomTable";
import { Label } from "@/components/ui/label";
import PaginationControls from "@/components/ui/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableHead from "@/components/ui/TableHead";
import { X } from "lucide-react";
import React from "react";
import { useReleaseLetterContext } from "../context";
import { ReleaseLetterProvider } from "../context/releaseLetterContext";
import ReleaseLetterAction from "./ReleaseLetterAction";
import ReleaseLetterHeader from "./ReleaseLetterHeader";
import ReleaseLetterListLoader from "./ReleaseLetterListLoader";
import { DeletePayslipAlert } from "../../payslip/components/PayslipDeleteAlert";

const ReleaseLetterRoot: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ReleaseLetterProvider>{children}</ReleaseLetterProvider>;
};

const Header: React.FC = () => {
  return <ReleaseLetterHeader />;
};

const Body: React.FC = () => {
  const { table, meta, loading, pageSize } = useReleaseLetterContext();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <ReleaseLetterAction />

      <div className="bg-white/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHead table={table} />
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <ReleaseLetterListLoader key={index} />
                ))
              ) : (
                <CustomTable table={table} />
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * pageSize,
                Number(meta?.total)
              )}
            </span>{" "}
            of <span className="font-medium">{meta?.total}</span> results
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5,10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <PaginationControls table={table} />
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const { table, selectedRows = [] } = useReleaseLetterContext();
  return (
    selectedRows.length > 0 && (
      <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {selectedRows.length} items selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md text-sm hover:from-red-600 hover:to-red-700 transition-all">
                Delete Selected
              </button>
              <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md text-sm hover:from-green-600 hover:to-green-700 transition-all">
                Export Selected
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                Mark as Active
              </button>
            </div>
          </div>
          <button
            onClick={() => table.resetRowSelection()}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

<DeletePayslipAlert />

      </div>
    )
  );
};
export const ReleaseLetter = Object.assign(ReleaseLetterRoot, {
  Header,
  Body,
  Footer,
});
