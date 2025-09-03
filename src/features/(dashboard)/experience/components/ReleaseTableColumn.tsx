import type { ColumnDef } from "@tanstack/react-table";
import type { IOfferLetter } from "../types";
import { AnimatedCheckbox } from "@/components/ui/AnimatedCheckbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EyeIcon, MoreHorizontal, Send, Trash2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusColor } from "@/lib/utils";
export const ReleaseTableColumns = (
  setSelectedOffer: (offer: IOfferLetter) => void,
  setDetailsOpen: (open: boolean) => void
): ColumnDef<IOfferLetter>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <AnimatedCheckbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <AnimatedCheckbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-1">
        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white ">
            {(row.getValue("employeeName") as string)?.charAt(0).toUpperCase()}
          </span>
        </div>
        {row.getValue("employeeName")}
      </div>
    ),
  },
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
    accessorKey: "employeeDateOfJoin",
    header: "Date Of Join",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const offer = row.original;
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
              disabled
              className="cursor-pointer"
              onClick={() => {
                setSelectedOffer(offer);
                setDetailsOpen(true);
              }}
            >
              View Details <EyeIcon />
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Delete
              <Trash2Icon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const ExperienceTableColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <AnimatedCheckbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <AnimatedCheckbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeName",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-1">
        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white ">
            {(row.getValue("employeeName") as string)?.charAt(0).toUpperCase()}
          </span>
        </div>
        {row.getValue("employeeName")}
      </div>
    ),
  },
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
    accessorKey: "employeeDateOfJoin",
    header: "Date Of Join",
  },
];
