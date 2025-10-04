import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import type { BackgroundVarificationType, IOfferLetter } from "../types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/layout/sidebartest/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import type { DataTableRowAction } from "@/types";



import {  TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock } from "lucide-react";
import { type ReactNode } from "react";

type StatusType = "Verified" | "Pending" | "Warning" | string;

interface StatusBadgeProps {
  label: string;
  status: StatusType;
  tooltipContent?: ReactNode;
}

const getStatusConfig = (status: StatusType) => {
  if (!status || status === "Pending") {
    return {
      variant: "outline" as const,
      icon: Clock,
    };
  }
  
  if (status === "Verified") {
    return {
      variant: "success" as const,
      icon: ShieldCheck,
    };
  }
  
  // Warning or any other status
  return {
    variant: "destructive" as const,
    icon: ShieldAlert,
  };
};

export const StatusBadge = ({ 
  label, 
  status, 
  tooltipContent 
}: StatusBadgeProps) => {
  const { variant, icon: Icon } = getStatusConfig(status);

  const badge = (
    <Badge variant={variant} className="flex gap-1 items-center">
      {label} <Icon size={12} />
    </Badge>
  );

  if (tooltipContent) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent>
            {tooltipContent}
          </TooltipContent>
        )}
      </Tooltip>
    );
  }

  return badge;
};
export const BackgroundVarificationTableColumns = (
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<BackgroundVarificationType> | null>
  >
): ColumnDef<BackgroundVarificationType>[] => [
  {
    accessorKey: "employeeName",
    header: "Name",
    cell: ({ row }) => (
      <h3
        onClick={() => {
          setRowAction({ row: row, variant: "SIDEBAR" });
        }}
        className="text-md font-semibold underline cursor-pointer text-purple-900"
      >
        {row?.original?.employeeName}
      </h3>
    ),
  },
  {
    accessorKey: "employeeId",
    header: "Employee Code",
  },
  {
    accessorKey: "contactNumber",
    header: "Number",
  },
  {
    accessorKey: "employeeEmail",
    header: "Email",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    // cell: () => <p className="text-green-700">Good</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {

     
    return  <>
        <div className="flex flex-wrap w-46 gap-1">
          <StatusBadge 
          label="Pan" 
          status={row?.original?.panStatus}
          
          tooltipContent={`PAN Status: ${row?.original?.panStatus||'Pending'}`}
        />
        <StatusBadge 
          label="Education" 
          status={row?.original?.educationStatus}
           
          tooltipContent={`educationStatus Status: ${row?.original?.educationStatus||'Pending'}`}
        />
        <StatusBadge 
          label="Aadhar" 
          status={row?.original?.adharStatus}
           
          tooltipContent={`Aadhar Status: ${row?.original?.adharStatus||'Pending'}`}
        />
        <StatusBadge 
          label="Experience" 
          status={row?.original?.experienceStatus}
           
          tooltipContent={`Experience Status: ${row?.original?.experienceStatus||'Pending'}`}
        />
        </div>
      </>
  },
  },

  {
    id: "ACTION",
    enableHiding: false,
    header: "Action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className=" bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 p-4 ml-16 transition-all duration-300"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer underline"
              onClick={() => {
                setRowAction({ row: row, variant: "SELECT" });
              }}
            >
              Send link for upload documents
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setRowAction({ row: row, variant: "UPLOAD" });
              }}
            >
              Upload Document files
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
// eslint-disable-next-line react-refresh/only-export-components
export const BackgroundVarificationImportColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "employeeEmail",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("employeeEmail")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
          row.getValue("status")
        )}`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "employeeDesignation",
    header: "Designation",
  },
  {
    accessorKey: "offerLetterDate",
    header: "Joining Date",
  },
];
