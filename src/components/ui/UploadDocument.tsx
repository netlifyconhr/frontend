/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios-instance";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  FileText,
  Upload,
} from "lucide-react";
import React, { useCallback, useRef, useState, type JSX } from "react";

interface UploadComponentProps<T> {
  onUploadComplete?: (file: File, processedData: T[]) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number; // in MB
  endpoint?: string;
  formDataName?: string;
  chunkSize?: number; // rows per chunk
}

interface FileUploadState {
  file: File | null;
  isDragging: boolean;
  isUploading: boolean;
  progress: number;
  uploadComplete: boolean;
  error: string | null;
  isProcessing: boolean;
  processedRows: number;
  totalRows: number;
  currentChunk: number;
  totalChunks: number;
  processingStage: "reading" | "uploading" | "complete" | null;
}

const CSVUploadComponent = <T,>({
  onUploadComplete,
  onUploadError,
  maxFileSize = 10,
  endpoint = "/api/upload",
  formDataName = "multipleReleaseLetterCsv",
}: UploadComponentProps<T>): JSX.Element => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isUploading: false,
    progress: 0,
    uploadComplete: false,
    error: null,
    isProcessing: false,
    processedRows: 0,
    totalRows: 0,
    currentChunk: 0,
    totalChunks: 0,
    processingStage: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const validExtensions = [".csv", ".xlsx", ".xls"];
    const fileExtension = file.name.toLowerCase();
    const isValidExtension = validExtensions.some((ext) =>
      fileExtension.endsWith(ext)
    );

    if (!isValidExtension) {
      return "Please select a CSV or Excel file (.csv, .xlsx, .xls)";
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }
    return null;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setUploadState((prev) => ({ ...prev, isDragging: false }));

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadState({
      file: null,
      isDragging: false,
      isUploading: false,
      progress: 0,
      uploadComplete: false,
      error: null,
      isProcessing: false,
      processedRows: 0,
      totalRows: 0,
      currentChunk: 0,
      totalChunks: 0,
      processingStage: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const {
    file,
    isDragging,
    isUploading,
    progress,
    uploadComplete,
    error,
    processedRows,
    totalRows,
    currentChunk,
    totalChunks,
    processingStage,
  } = uploadState;

  const handleFileUpload = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadState((prev) => ({ ...prev, error }));
      onUploadError?.(error);
      return;
    }

    setUploadState((prev) => ({
      ...prev,
      file,
      error: null,
      uploadComplete: false,
      progress: 0,
      processingStage: null,
    }));
  };

  const startUpload = async () => {
    if (!uploadState.file) return;

    setUploadState((prev) => ({
      ...prev,
      isUploading: true,
      processingStage: "uploading",
    }));

    try {
      const formData = new FormData();
      formData.append(formDataName, uploadState.file);

      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadState((prev) => ({ ...prev, progress }));
        },
      });

      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        uploadComplete: true,
        progress: 100,
        processingStage: "complete",
      }));

      onUploadComplete?.(uploadState.file, response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setUploadState((prev) => ({
        ...prev,
        isUploading: false,
        error: errorMessage,
        processingStage: null,
      }));
      onUploadError?.(errorMessage);
    }
  };

  return (
    <DialogContent className="sm:max-w-3xl bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent text-center">
          Import CSV File
        </DialogTitle>
        <DialogDescription className="text-gray-600 text-center">
          Upload your CSV file to import data into the system.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                    ${
                      isDragging
                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-green-50"
                        : "border-gray-300 hover:border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
                    }
                    ${isUploading ? "pointer-events-none" : ""}
                  `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!file && !isUploading && !uploadComplete && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {isDragging
                      ? "Drop your file here"
                      : "Click or drag CSV/Excel file to upload"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Supports CSV, XLSX, XLS • Maximum file size: {maxFileSize}MB
                  </p>
                </div>
              </div>
            )}

            {file && !uploadComplete && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}

            {uploadComplete && (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-green-600">
                    Upload Complete!
                  </p>
                  <p className="text-sm text-gray-600">{file?.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {processingStage === "reading" && "Reading file..."}
                  {processingStage === "uploading" && `Uploading ...`}
                  {processingStage === "complete" && "Processing complete!"}
                </span>
                <span className="text-gray-800 font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Processing Stats */}
              {processingStage === "uploading" && totalRows > 0 && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">
                      Processed:{" "}
                      <span className="font-medium text-gray-800">
                        {processedRows}
                      </span>{" "}
                      / {totalRows} rows
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">
                      Chunk:{" "}
                      <span className="font-medium text-gray-800">
                        {currentChunk}
                      </span>{" "}
                      / {totalChunks}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          {file && !uploadComplete && !isUploading && (
            <div className="space-y-4">
              <Button
                onClick={startUpload}
                className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700"
              >
                Confirm & Upload
              </Button>
            </div>
          )}

          {/* File Info */}
        </div>
      </div>

      <DialogFooter className="sm:justify-between">
        <div className="flex space-x-2">
          {uploadComplete && (
            <Button
              onClick={resetUpload}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Upload Another File
            </Button>
          )}

          {error && (
            <Button
              onClick={resetUpload}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
            >
              Try Again
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          {uploadComplete && (
            <Button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
              Continue
            </Button>
          )}

          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              className="px-6 py-2 border-2 border-gray-500 text-gray-500 rounded-lg hover:bg-gray-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Processing..." : "Cancel"}
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default CSVUploadComponent;
