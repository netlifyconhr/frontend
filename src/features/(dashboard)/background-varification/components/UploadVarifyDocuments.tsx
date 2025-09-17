import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  X,
  FileText,
  Image,
  File,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function UploadVerifyDocuments() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});

  // File validation settings
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_TYPES = {
    "application/pdf": ".pdf",
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/msword": ".doc",
  };

  const validateFile = (file) => {
    const errors = [];

    if (file.size > MAX_FILE_SIZE) {
      errors.push(
        `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`
      );
    }

    if (!Object.keys(ACCEPTED_TYPES).includes(file.type)) {
      errors.push(
        "File type not supported. Please upload PDF, PNG, JPG, or DOCX files."
      );
    }

    return errors;
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newFiles = [];
    const newErrors = {};

    fileArray.forEach((file, index) => {
      const fileId = Date.now() + index;
      const validationErrors = validateFile(file);

      if (validationErrors.length > 0) {
        newErrors[fileId] = validationErrors;
      }

      newFiles.push({
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: validationErrors.length > 0 ? "error" : "pending",
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fileId];
      return newErrors;
    });
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const clearAllFiles = () => {
    setFiles([]);
    setErrors({});
    setUploadProgress({});
    setUploadedFiles([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType, status) => {
    let IconComponent;
    if (fileType.startsWith("image/")) IconComponent = Image;
    else if (fileType.includes("pdf") || fileType.includes("document"))
      IconComponent = FileText;
    else IconComponent = File;

    const getColor = () => {
      switch (status) {
        case "uploaded":
          return "text-green-500";
        case "error":
          return "text-red-500";
        case "uploading":
          return "text-blue-500";
        default:
          return "text-gray-500";
      }
    };

    return <IconComponent className={`w-6 h-6 ${getColor()}`} />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "uploading":
        return (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      default:
        return null;
    }
  };

  const simulateUpload = (fileId) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }));
          clearInterval(interval);
          resolve();
        } else {
          setUploadProgress((prev) => ({
            ...prev,
            [fileId]: Math.round(progress),
          }));
        }
      }, 200);
    });
  };

  const handleSubmit = async () => {
    const validFiles = files.filter((file) => file.status !== "error");
    if (validFiles.length === 0) return;

    setUploading(true);

    // Update status to uploading
    setFiles((prev) =>
      prev.map((file) =>
        file.status !== "error" ? { ...file, status: "uploading" } : file
      )
    );

    try {
      // Simulate upload for each file
      await Promise.all(
        validFiles.map(async (file) => {
          await simulateUpload(file.id);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "uploaded" } : f
            )
          );
        })
      );

      setUploadedFiles(validFiles);
      console.log("Successfully uploaded files:", validFiles);

      // Optional: Auto-close dialog after successful upload
      // setTimeout(() => {
      //   document.querySelector('[data-state="open"]')?.click();
      // }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      setFiles((prev) =>
        prev.map((file) =>
          file.status === "uploading" ? { ...file, status: "error" } : file
        )
      );
    } finally {
      setUploading(false);
    }
  };

  const validFilesCount = files.filter(
    (file) => file.status !== "error"
  ).length;
  const uploadedCount = files.filter(
    (file) => file.status === "uploaded"
  ).length;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Documents
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload & Verify Documents</DialogTitle>
          <DialogDescription>
            Upload your verification documents. You can select multiple files at
            once. Accepted formats: PDF, PNG, JPG, DOCX (max 10MB each)
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 flex-1 overflow-hidden">
          {/* Upload Area */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Documents</Label>
              {files.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFiles}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </Button>
              )}
            </div>
            <div
              className={`
                relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 transform
                ${
                  dragActive
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 scale-[1.02] shadow-xl shadow-blue-100/50"
                    : "border-gray-300 bg-gradient-to-br from-gray-50 via-white to-gray-50 hover:border-gray-400 hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:shadow-lg hover:shadow-gray-200/50"
                }
              `}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-sm ${
                  dragActive
                    ? "bg-gradient-to-br from-blue-100 to-indigo-200"
                    : "bg-gradient-to-br from-white to-gray-100"
                }`}
              >
                <Upload
                  className={`w-8 h-8 transition-colors drop-shadow-sm ${
                    dragActive ? "text-blue-600" : "text-gray-500"
                  }`}
                />
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Click to upload</span> or drag and
                drop
              </div>
              <div className="text-xs text-gray-500">
                PDF, PNG, JPG, DOCX up to 10MB each
              </div>
              <Input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.docx,.doc"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleFileSelect(e.target.files)}
                disabled={uploading}
              />
            </div>
          </div>

          {/* Upload Progress Summary */}
          {uploading && (
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">
                    Uploading documents...
                  </span>
                </div>
                <span className="text-blue-600 font-bold">
                  {uploadedCount}/{validFilesCount} completed
                </span>
              </div>
            </div>
          )}

          {/* Success Summary */}
          {uploadedCount > 0 && !uploading && (
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 font-medium">
                  {uploadedCount} document{uploadedCount !== 1 ? "s" : ""}{" "}
                  uploaded successfully
                </span>
              </div>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="grid gap-3 flex-1 overflow-hidden">
              <Label>
                Selected Files ({files.length})
                {validFilesCount !== files.length && (
                  <span className="text-red-500 ml-1">
                    ({files.length - validFilesCount} with errors)
                  </span>
                )}
              </Label>
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 flex gap-1 flex-wrap">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      file.status === "error"
                        ? "bg-red-50 border-red-200"
                        : file.status === "uploaded"
                        ? "bg-green-50 border-green-200"
                        : file.status === "uploading"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type, file.status)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span>{formatFileSize(file.size)}</span>
                          {file.status === "uploading" &&
                            uploadProgress[file.id] && (
                              <span className="text-blue-600">
                                {uploadProgress[file.id]}%
                              </span>
                            )}
                        </div>
                        {errors[file.id] && (
                          <div className="text-xs text-red-600 mt-1">
                            {errors[file.id].join(", ")}
                          </div>
                        )}
                        {file.status === "uploading" &&
                          uploadProgress[file.id] && (
                            <div className="mt-2 bg-white rounded-full overflow-hidden">
                              <div
                                className="h-1 bg-blue-500 transition-all duration-300"
                                style={{ width: `${uploadProgress[file.id]}%` }}
                              />
                            </div>
                          )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                          onClick={() => removeFile(file.id)}
                          disabled={uploading && file.status === "uploading"}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" disabled={uploading}>
              {uploadedCount > 0 ? "Close" : "Cancel"}
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={validFilesCount === 0 || uploading}
            className="gap-2"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload {validFilesCount > 0 && `(${validFilesCount})`}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
