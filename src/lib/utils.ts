import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { utils, writeFile } from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Inactive":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const handleSampleDownload = (data: unknown[], fileName: string) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();

  utils.book_append_sheet(workbook, worksheet, "Users");

  writeFile(workbook, fileName + ".xlsx");
};
