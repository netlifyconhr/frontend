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
  XCircle,
} from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { OfferLetterTableColumns } from "../components/ReleaseTableColumn";

import type { TResponse } from "@/types";
import { formatISO } from "date-fns";
import { toast } from "sonner";
import UploadError from "../components/UploadError";
import { offerLetterStatus, type IOfferLetter } from "../types";

interface UserData {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
}

interface ProcessStatus {
  processId: string;
  total: number;
  sent: number;
  failed: number;
  pending: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  completedEmails: string[];
  failedEmails: Array<{ email: string; error: string; row: number }>;
}

interface UploadResult {
  success: UserData[];
  failed: Array<{ row: number; data: Partial<UserData>; error: string }>;
}

const ExcelUploadWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [error, seterror] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<unknown[]>([]);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [processedSuccess, setProcessedSuccess] = useState<UserData[]>([]);
  const [processedFailed, setProcessedFailed] = useState<
    Array<{ row: number; data: Partial<UserData>; error: string }>
  >([]);
  const [processStatus, setProcessStatus] = useState<ProcessStatus | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clickTimeRef = useRef<Date | null>(null);
  const POLL_INTERVAL = 5000; // 5 seconds
  const POLL_DURATION = 30 * 60 * 1000; // 30 minutes in ms


    const poll = async (intervalId: NodeJS.Timeout) => {

    const startTime = clickTimeRef.current;
      if (!startTime) {
      console.error("No click time available");
      return;
    }
      const now = new Date();
      const from = formatISO(startTime);
      const to = formatISO(now);

      const url = `/offer-letter?createdAt[$gte]=${encodeURIComponent(
        from
      )}&createdAt[$lte]=${encodeURIComponent(to)}&limit=10000`;

      try {
        const response = await axiosInstance.get<TResponse<IOfferLetter[]>>(
          url
        );

        console.log(error,"ghfhgfhfhfhkf")
        if (Number(response?.data?.data?.length) >= parsedData?.length ||error) {
          clearInterval(intervalId);
          location.href = "/dashboard/offer-letter";
        }

        const sentData = response?.data?.data?.reduce(
          (acc, cur) => {
            if (cur?.status === offerLetterStatus.SENT) {
              return { ...acc, sent: [...acc.sent, cur] };
            } else {
              return { ...acc, failed: [...acc.failed, cur] };
            }
          },
          { sent: [], failed: [] }
        );
        console.log(response, "response");

        const progressPercentage = Math.round(
          ((sentData?.sent?.length + sentData?.failed?.length) /
            parsedData.length) *
            100
        );
        setUploadProgress(progressPercentage);
        console.log(sentData, progressPercentage, "progressPercentage");
        const successUsers = sentData?.sent?.map((it, index) => ({
          id: `success-${index}`,
          name: it?.employeeName,
          email: it?.employeeEmail,
          department: "N/A",
          position: "N/A",
        }));

        const failedUsers = sentData?.failed?.map((it, index) => ({
          row: index + 1,
          data: {
            name: it?.employeeName,
            email: it?.employeeEmail,
          },
          error: "string",
        }));

        setProcessedSuccess(successUsers);
        setProcessedFailed(failedUsers);
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Something went wrong!";
        toast.error(errMsg);
      }
    };
  const handleSubmit = async () => {
    // Save click time
    clickTimeRef.current = new Date();

    const formData = new FormData();
    formData.append("multipleOfferLetterCsv", uploadedFile);
      let badRequesterror=false;

    axiosInstance.post("/offer-letter/upload-offer-letter-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res=>{
      console.log(res,"res")
    }).catch(err=>{
      console.log(err,"errr")
      if(err?.status===400 && err?.data?.data==='INVALID_MAIL_CONFIG'){
seterror(true);
badRequesterror=true;
      }
    });
    console.log("Clicked at:", clickTimeRef.current.toISOString());

    // Wait 5 seconds before starting the loop
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));

    const startTimestamp = Date.now();

  

  

    const intervalId = setInterval(async () => {
      const elapsed = Date.now() - startTimestamp;

      if (elapsed >= POLL_DURATION || badRequesterror) {
        clearInterval(intervalId);
        console.log("Polling ended after 30 minutes.");
        return;
      }

      await poll(intervalId);
    }, POLL_INTERVAL);
  };

  // Simulate Excel file parsing (replace with actual parsing library like SheetJS)

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
    setIsUploading(true);
    setUploadProgress(0);
    setShowResults(false);
    setProcessedSuccess([]);
    setProcessedFailed([]);
    setCurrentStep(3);

    try {
      handleSubmit();
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      alert("Upload failed. Please try again.");
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setParsedData([]);
    setUploadResult(null);
    setIsUploading(false);
    setUploadProgress(0);
    setShowResults(false);
    setProcessedSuccess([]);
    setProcessedFailed([]);
    setProcessStatus(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getProgressMessage = () => {
    if (!processStatus) return "Initializing...";

    switch (processStatus.status) {
      case "PENDING":
        return "Preparing to process...";
      case "PROCESSING":
        return `Processing ${processStatus.sent + processStatus.failed} of ${
          processStatus.total
        } records...`;
      case "COMPLETED":
        return "Processing completed!";
      case "FAILED":
        return "Processing failed!";
      default:
        return "Processing...";
    }
  };


  const table = useReactTable({
    data: parsedData,

    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    columns: OfferLetterTableColumns,
    manualPagination: false,
    pageCount: undefined,
  });


  if(error){

    return <UploadError />
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
            Upload and process offer letter information from Excel/CSV files
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                <div className="ml-3">
                  <p
                    className={`font-medium ${
                      currentStep >= step ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step === 1 && "Upload File"}
                    {step === 2 && "Preview Data"}
                    {step === 3 && "Upload Results"}
                  </p>
                </div>
                {step < 3 && (
                  <ArrowRight
                    className={`w-5 h-5 mx-4 ${
                      currentStep > step ? "text-blue-500" : "text-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
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
                      <span className="text-gray-700">
                        Offer letter information data
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mr-3" />
                      <span className="text-gray-700">
                        Maximum file size: 10MB
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

          {/* Step 3: Results */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Step 3: Upload Progress
              </h2>

              {isUploading && (
                <div className="mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                      <h3 className="text-lg font-semibold text-blue-800">
                        Processing Upload...
                      </h3>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-blue-700 mb-2">
                        <span>Upload Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-blue-600 text-sm">
                      {getProgressMessage()}
                    </p>
                  </div>

                  {/* Live Processing Results */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Success List - Live Updates */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 h-80 flex flex-col">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        <h3 className="text-lg font-semibold text-green-800">
                          Successfully Processed ({processedSuccess.length})
                        </h3>
                      </div>
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
                        <ul className="space-y-2 pr-2">
                          {processedSuccess.map((user, index) => (
                            <li
                              key={user.id}
                              className="flex items-center text-green-700 animate-fade-in"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                                {user.name} ({user.email})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Failed List - Live Updates */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 h-80 flex flex-col">
                      <div className="flex items-center mb-4">
                        <XCircle className="w-6 h-6 text-red-500 mr-3" />
                        <h3 className="text-lg font-semibold text-red-800">
                          Failed Processing ({processedFailed.length})
                        </h3>
                      </div>
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100">
                        <ul className="space-y-3 pr-2">
                          {processedFailed.map((failure, index) => (
                            <li
                              key={index}
                              className="text-red-700 animate-fade-in"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="flex items-start">
                                <XCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-sm">
                                    Row {failure.row}: {failure.data.name} ({" "}
                                    {failure.data.email})
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showResults && uploadResult && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Final Upload Results
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Success List */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 h-80 flex flex-col">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        <h3 className="text-lg font-semibold text-green-800">
                          Successfully Uploaded ({uploadResult.success.length})
                        </h3>
                      </div>
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
                        <ul className="space-y-2 pr-2">
                          {uploadResult.success.map((user) => (
                            <li
                              key={user.id}
                              className="flex items-center text-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                                {user.name} ({user.email})
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Failed List */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 h-80 flex flex-col">
                      <div className="flex items-center mb-4">
                        <XCircle className="w-6 h-6 text-red-500 mr-3" />
                        <h3 className="text-lg font-semibold text-red-800">
                          Failed Uploads ({uploadResult.failed.length})
                        </h3>
                      </div>
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100">
                        <ul className="space-y-3 pr-2">
                          {uploadResult.failed.map((failure, index) => (
                            <li key={index} className="text-red-700">
                              <div className="flex items-start">
                                <XCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                                <div>
                                  <span className="font-medium text-sm">
                                    Row {failure.row}: {failure.data.name}
                                  </span>
                                  <p className="text-xs text-red-600 mt-1">
                                    {failure.error}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showResults && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={resetWizard}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    Upload Another File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ExcelUploadWizard;
