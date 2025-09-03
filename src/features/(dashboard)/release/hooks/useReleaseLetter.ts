import { useEffect, useMemo, useRef, useState } from "react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/lib/axios-instance";
import type { TMeta, TResponse } from "@/types";
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
import { toast } from "sonner";
import { ReleaseTableColumns } from "../components/ReleaseTableColumn";
import { format, subMonths } from "date-fns";

export enum offerLetterStatus {
  ALL = "all",
  DRAFT = "draft",
  SENT = "send",
  FAILED = "failed",
}
type FetchSentEmailsParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status: offerLetterStatus;
  date?: string;
};

export interface IOfferLetter {
  employeeName: string;
  employeeEmail: string;
  employeeAddress: string;
  employeeDesignation: string;
  employeeDateOfJoin: string;
  employeeCtc: string;
  companyLogo: string;
  companyName: string;
  companyAddress: string;
  offerLetterDate: string;
  companyContactName: string;
  companyPersonTitle: string;
  companyContactNumber: string;
  companyPersonalEmail: string;
  emailSubject: string;
  emailMessage: string;
  status: offerLetterStatus;
  generateByUser: string;
  createdAt: string;
  _id: string;
}

async function fetchSentEmails({
  page = 1,
  limit = 5,
  searchTerm = "",
  status = offerLetterStatus.ALL,
  date,
}: FetchSentEmailsParams): Promise<TResponse<IOfferLetter[]> | undefined> {
  try {
    const params: Record<string, string | number> = {
      page,
      limit,
      ...(searchTerm && { searchTerm }),
      // month,
      // year,
    };
    if (status !== offerLetterStatus.ALL) {
      params.status = status;
    }
    if (date) {
      params.month = date;
    }
    const response = await axiosInstance.get<TResponse<IOfferLetter[]>>(
      "/release-letter",
      { params }
    );
    return response.data;
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Something went wrong!";
    toast.error(errMsg);
  }
}

export default function useReleaseLetter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(
    format(subMonths(new Date(), 1), "MMMM").toLowerCase()
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pageSize, setPageSize] = useState(5);

  const [sentEmails, setSentEmails] = useState<IOfferLetter[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<IOfferLetter | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<offerLetterStatus>(
    offerLetterStatus.ALL
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<TMeta>();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const columns = useMemo(
    () => ReleaseTableColumns(setSelectedOffer, setDetailsOpen),
    []
  );
  const table = useReactTable({
    data: sentEmails ?? [],
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
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const selectedRows = table.getSelectedRowModel().rows;
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await fetchSentEmails({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        searchTerm: debouncedSearchTerm,
        status: statusFilter,
        date,
      });
      if (res) {
        if (res.data) {
          setSentEmails(res.data);
        }
        if (res.meta && res.meta.totalPage) {
          setMeta(res?.meta);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    debouncedSearchTerm,
    statusFilter,
    date,
  ]);

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
    sentEmails,
  };
}
