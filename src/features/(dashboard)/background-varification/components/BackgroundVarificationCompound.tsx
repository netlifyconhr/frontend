/* eslint-disable react-hooks/exhaustive-deps */
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
import { Copy, CopyCheck, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReleaseLetterContext } from "../context";
import { OfferLetterProvider } from "../context/releaseLetterContext";
import BackgroundVarificationHeader from "./BackgroundVarificationHeader";
import ReleaseLetterAction from "./ReleaseLetterAction";
import ReleaseLetterListLoader from "./ReleaseLetterListLoader";
import UploadVarifyDocuments from "./UploadVarifyDocuments";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import SideUserInfoSheet from "./SideUserInfoSheet";

const ReleaseLetterRoot: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <OfferLetterProvider>{children}</OfferLetterProvider>;
};

const Header: React.FC = () => {
  return <BackgroundVarificationHeader />;
};

const Body: React.FC = () => {
  const { table, meta, loading, pageSize, rowAction, setRowAction } =
    useReleaseLetterContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["BG", searchParams.get("generate")],
    queryFn: () => {
      return axiosInstance.post(
        `/generated-link/generate-background-verification-url/${searchParams.get(
          "generate"
        )}`
      );
    },
    enabled: !!searchParams.get("generate"),
  });
  console.log(data, "link");

  useEffect(() => {
    if (rowAction?.variant === "SELECT") {
      searchParams.set("generate", rowAction?.row?.original?._id);
    } else {
      searchParams.delete("generate");
    }
    setSearchParams(searchParams, { replace: true });
  }, [rowAction]);
  return (
    <>
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
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
      <UploadVarifyDocuments
        rowAction={rowAction}
        setRowAction={setRowAction}
      />

      <Dialog
        open={!!searchParams.get("generate")}
        onOpenChange={() => {
          searchParams.delete("generate");
          setSearchParams(searchParams, { replace: true });
        }}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-center md:text-left">
                Share This Link
              </h1>
            </DialogTitle>
          </DialogHeader>

          <Clipboard />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SideUserInfoSheet
        open={rowAction?.variant === "SIDEBAR"}
        handleChange={() => {
          setRowAction(null);
        }}
        userInfo={rowAction?.row?.original}
      />
    </>
  );
};

export default function Clipboard() {
  const inputRef = useRef<HTMLInputElement>(null); // ✅ Properly typed
  const [copySuccess, setCopySuccess] = useState<string>("");

  const copyToClipboard = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      inputEl.select(); // ✅ 'select' exists on HTMLInputElement
      document.execCommand("copy");
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };
  const location = useLocation();

  // This will give you the URLSearchParams object
  const queryParams = new URLSearchParams(location.search);

  // Get the `generate` parameter from the URL
  const generateId = queryParams.get("generate");

  return (
    <section className="bg-gradient-to-br rounded-xl from-purple-600 via-pink-500 to-orange-400 py-8  flex items-center justify-center ">
      <div className="  w-full mx-6 ">
        <div className="relative group">
          <input
            type="text"
            ref={inputRef}
            value={`https://docs.netlifycon-hr.in?userId=${generateId}`}
            readOnly
            className="h-14 w-full rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm py-4 pl-6 pr-20 text-white placeholder-white/70 outline-none duration-300 selection:bg-white/30 focus:border-white/60 focus:bg-white/30 focus:shadow-lg text-lg font-medium"
          />

          <button
            onClick={copyToClipboard}
            className={`absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white duration-300 transform transition-all ${
              copySuccess
                ? "bg-green-500 shadow-green-500/50 shadow-lg scale-105"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
            }`}
          >
            <span className="flex items-center">
              {copySuccess ? <CopyCheck /> : <Copy />}
            </span>
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>

        {copySuccess && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
            <p className="text-green-200 text-sm font-medium animate-pulse">
              ✨ Link copied to clipboard! ✨
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Share this link with anyone to give them access
          </p>
        </div>
      </div>
    </section>
  );
}
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
      </div>
    )
  );
};
export const BackgroundVarification = Object.assign(ReleaseLetterRoot, {
  Header,
  Body,
  Footer,
});
