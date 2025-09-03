import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Search, Upload } from "lucide-react";

import { handleSampleDownload } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useReleaseLetterContext } from "../context";
import { offerLetterStatus } from "../types";
import { MONTH_LIST } from "@/constant/common";
export default function ReleaseLetterAction() {
  const {
    searchTerm,
    sentEmails,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    setDate,
    date,
  } = useReleaseLetterContext();
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search and Date Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block text-xs md:text-sm w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <Select
            value={date}
            onValueChange={(value: string) => setDate(value)}
          >
            <SelectTrigger className="md:w-[180px] w-full text-xs md:text-[15px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent className="text-xs md:text-[15px]">
              {MONTH_LIST.map((m) => (
                <SelectItem key={m} value={m.toLowerCase()}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Filters */}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-3">
            <Select
              value={statusFilter}
              onValueChange={(value: offerLetterStatus) =>
                setStatusFilter(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={offerLetterStatus.ALL}>All</SelectItem>
                <SelectItem value={offerLetterStatus.SENT}>Sent</SelectItem>
                <SelectItem value={offerLetterStatus.DRAFT}>Draft</SelectItem>
                <SelectItem value={offerLetterStatus.FAILED}>Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link
            to={"/dashboard/relieving-letter-upload"}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer  text-xs md:text-sm"
          >
            <Download className=" md:w-4 w-3.5" />
            Import
          </Link>

          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2  text-xs md:text-sm"
            onClick={() => {
              handleSampleDownload(sentEmails, "payslip_letter");
            }}
          >
            <Upload className=" md:w-4 w-3.5" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
