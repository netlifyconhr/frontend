import CustomTable from "@/components/ui/CustomTable";
import TableHead from "@/components/ui/TableHead";
import axiosInstance from "@/lib/axios-instance";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Upload,
  Users,
} from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { BackgroundVarificationImportColumns } from "../components/ReleaseTableColumn";

import { useMutation } from "@tanstack/react-query";
import UploadError from "../components/UploadError";
import { useNavigate } from "react-router-dom";

const BackgroundVarificationUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [parsedData, setParsedData] = useState<unknown[]>([]);

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { mutate, isError: error } = useMutation({
    mutationFn: (payload: File) => {
      const formData = new FormData();
      formData.append("backgroundVarificationCsv", payload);
      return axiosInstance.post(
        "/background-varification/upload-bulk-background-varificaton-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onSuccess() {
      navigate("/dashboard/background-check");
    },
  });

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (
        file &&
        (file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.name.endsWith(".xlsx") ||
          file.name.endsWith(".csv"))
      ) {
        setUploadedFile(file);
        try {
          const reader = new FileReader();

          reader.onload = (event) => {
            const data = event.target?.result;
            if (!data) return;

            const workbook = XLSX.read(data, {
              type: "array", // This matches FileReader's result type
              cellDates: true,
            });

            const sheetName = workbook.SheetNames[0];
            const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
              defval: "",
              raw: false,
            });

            setParsedData(rows);
          };

          reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
        } catch (error) {
          console.error("Error parsing file:", error);
          alert("Error parsing file. Please check the file format.");
        }
      } else {
        alert("Please select a valid Excel (.xlsx) or CSV file.");
      }
    },
    []
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".csv"))
    ) {
      setUploadedFile(file);
      try {
        const reader = new FileReader();

        reader.onload = (event) => {
          const data = event.target?.result;
          if (!data) return;

          const workbook = XLSX.read(data, {
            type: "array", // This matches FileReader's result type
            cellDates: true,
          });

          const sheetName = workbook.SheetNames[0];
          const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            defval: "",
            raw: false,
          });

          setParsedData(rows);
        };
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Error parsing file. Please check the file format.");
      }
    } else {
      alert("Please select a valid Excel (.xlsx) or CSV file.");
    }
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmUpload = async () => {
    try {
      mutate(uploadedFile as File);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      alert("Upload failed. Please try again.");
    }
  };

  const table = useReactTable({
    data: parsedData,

    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    columns: BackgroundVarificationImportColumns,
    manualPagination: false,
    pageCount: undefined,
  });

  if (error) {
    return <UploadError />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Excel Upload
          </h1>
          <p className="text-gray-600">
            Upload and process background varification information from
            Excel/CSV files
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Step 1: Upload Excel/CSV File
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Excel or CSV File
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                {/* File Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    File Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">
                        Excel (.xlsx, .xls) or CSV format
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Verification data</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="text-gray-700">
                        Maximum file size: 3MB
                      </span>
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium text-green-800">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-green-600">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  disabled={!uploadedFile}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Step 2: Preview Data (Total Items: {parsedData?.length} )
              </h2>
              <div className="overflow-x-auto h-[300px] overflow-y-auto">
                <table className="w-full ">
                  <TableHead table={table} />
                  <CustomTable table={table} />
                </table>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </button>
                <button
                  onClick={handleConfirmUpload}
                  disabled={isUploading}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
                >
                  {isUploading ? "Starting Upload..." : "Confirm Upload"}
                  {!isUploading && <ArrowRight className="w-5 h-5 ml-2" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundVarificationUpload;
