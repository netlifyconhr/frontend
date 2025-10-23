import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FerrisWheel, Search, Upload } from "lucide-react";

import { Link } from "react-router-dom";
import { useReleaseLetterContext } from "../context";
import { offerLetterStatus, type BackgroundVarificationType } from "../types";
export default function ReleaseLetterAction() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    data
  } = useReleaseLetterContext();
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
        {/* Search and Date Filters */}
        <div className="flex flex-col sm:flex-row  flex-1">
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
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Verification Pending</SelectItem>

                <SelectItem value="completed">Verification Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link
            to={"/dashboard/background-check-upload"}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer  text-xs md:text-sm"
          >
            <Download className=" md:w-4 w-3.5" />
            Import
          </Link>

         

<ButtonGroupDropdown />
          
        </div>
      </div>
    </div>
  );
}





import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  UserRoundXIcon,
} from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import axiosInstance from "@/lib/axios-instance";
import type { TResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
function ButtonGroupDropdown() {
  const { data } = useReleaseLetterContext();
  const formattedAllData = data?.data?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (filterType?: string) => {
      // Prepare params dynamically
      const params: Record<string, any> = {
        page: 1,
        limit: 1500,
      };

      if (filterType === "completed") {
        params.verificationStatus = "completed";
      } else if (filterType === "pending") {
        params.verificationStatus = "pending";
      }

      // ✅ API call
      return axiosInstance.get<TResponse<BackgroundVarificationType[]>>(
        "/background-varification",
        { params }
      );
    },
  });

  // ✅ Export handler
  const handleExport = async (filterType?: string) => {
    try {
      let exportData = [];

      // 🟢 Case 1: Selected → Use already available data, no API call
      if (filterType === "selected") {
        exportData = formattedAllData;
      } 
      // 🟢 Case 2: All / Completed / Pending → Fetch from API
      else {
        const res = await mutateAsync(filterType);
        exportData = res?.data?.data || [];
      }

      if (!exportData || exportData.length === 0) {
        alert("No data available to export!");
        return;
      }

          const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "BackgroundVerification");

      // ✅ Dynamic filename
      const fileNameMap: Record<string, string> = {
        all: "Background_Verification_All.xlsx",
        completed: "Background_Verification_Completed.xlsx",
        pending: "Background_Verification_Pending.xlsx",
        selected: "Background_Verification_Selected.xlsx",
      };

      const fileName = fileNameMap[filterType||'selected'] || "Background_Verification.xlsx";

      // ✅ Trigger file download
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data!");
    }
  };
  return (
    <ButtonGroup>
      {/* 🔹 Main Export Button (default = All) */}
      <Button
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform  flex items-center gap-2  text-xs md:text-sm"
      disabled={isPending} variant="outline" onClick={() => handleExport("selected")}>
       {isPending? <Spinner />: <Upload className="md:w-4 w-3.5" />}
        Export
      </Button>

      {/* 🔹 Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="!pl-2">
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="[--radius:1rem]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleExport("selected")}>
              <FerrisWheel className="mr-2" />
              Selected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("completed")}>
              <CheckIcon className="mr-2" />
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("pending")}>
              <AlertTriangleIcon className="mr-2" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("all")}>
              <UserRoundXIcon className="mr-2" />
              All
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

