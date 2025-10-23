import { useMemo, useRef, useState } from "react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/lib/axios-instance";
import type { DataTableRowAction, TResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { format, subMonths } from "date-fns";
import { BackgroundVarificationTableColumns } from "../components/ReleaseTableColumn";
import { type BackgroundVarificationType } from "../types";



export default function useOfferLetter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(
    format(subMonths(new Date(), 1), "MMMM").toLowerCase()
  );
  const [rowAction, setRowAction] =
    useState<DataTableRowAction<BackgroundVarificationType> | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pageSize, setPageSize] = useState(5);

  const [selectedOffer, setSelectedOffer] = useState<BackgroundVarificationType | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(
    "all"
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useMemo(
    () => BackgroundVarificationTableColumns(setRowAction),
    []
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const {data,isFetching:loading}=useQuery({
    queryKey:['VFG_LIST',{ page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        searchTerm: debouncedSearchTerm,statusFilter}],
    queryFn: ()=>{
      return axiosInstance.get<TResponse<BackgroundVarificationType[]>>(
      "/background-varification",
      { params :{
     page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      ...(statusFilter!=='all' && { verificationStatus:statusFilter }),
      ...(searchTerm && { searchTerm }),

      // month,
      // year,
    }}
    );
    }
  })
const meta=data?.data?.meta;
  const table = useReactTable({
    data: data?.data?.data ?? [],
    columns,
    pageCount: Number(meta?.totalPage),
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;

 

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const handleUploadSuccess = () => {
    closeRef.current?.click();
  };
  return {
    table,
    meta,
    loading,
    pageSize,
    selectedRows,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    date,
    setDate,
    handleUploadSuccess,
    detailsOpen,
    selectedOffer,
    setPageSize,
    rowAction,
    setRowAction,
    data
  };
}
